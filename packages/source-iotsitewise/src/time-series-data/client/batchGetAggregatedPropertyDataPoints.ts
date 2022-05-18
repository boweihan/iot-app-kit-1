import {
  BatchGetAssetPropertyAggregatesCommand,
  BatchGetAssetPropertyAggregatesErrorEntry,
  BatchGetAssetPropertyAggregatesSuccessEntry,
  IoTSiteWiseClient,
  TimeOrdering,
  AggregateType,
} from '@aws-sdk/client-iotsitewise';
import { aggregateToDataPoint } from '../util/toDataPoint';
import { dataStreamFromSiteWise } from '../dataStreamFromSiteWise';
import { parseDuration, OnSuccessCallback, ErrorCallback, RequestInformationAndRange } from '@iot-app-kit/core';
import { toSiteWiseAssetProperty } from '../util/dataStreamId';
import { isDefined } from '../../common/predicates';
import { AggregatedPropertyParams } from './client';
import { createEntryBatches } from './batch';
import { RESOLUTION_TO_MS_MAPPING } from '../util/resolution';

type BatchAggregateEntry = {
  requestInformation: RequestInformationAndRange;
  aggregateTypes: AggregateType[];
  maxResults?: number;
  onError: ErrorCallback;
  onSuccess: OnSuccessCallback;
  requestStart: Date;
  requestEnd: Date;
};

type BatchEntryCallbackCache = {
  [key: string]: {
    onError: (entry: BatchGetAssetPropertyAggregatesErrorEntry) => void;
    onSuccess: (entry: BatchGetAssetPropertyAggregatesSuccessEntry) => void;
  };
};

const batchGetAggregatedPropertyDataPointsForProperty = async ({
  client,
  entries,
  nextToken: prevToken,
}: {
  client: IoTSiteWiseClient;
  entries: BatchAggregateEntry[];
  nextToken?: string;
}) => {
  // callback cache makes it convenient to capture request data in a closure.
  // the cache exposes methods that only require batch response entry as an argument.
  const callbackCache: BatchEntryCallbackCache = {};

  return Promise.all(
    createEntryBatches<BatchAggregateEntry>(entries)
      .filter((batch) => batch.length > 0) // filter out empty batches
      .map(([batch, maxResults], requestIndex) =>
        client
          .send(
            new BatchGetAssetPropertyAggregatesCommand({
              entries: batch.map((entry, entryIndex) => {
                const { requestInformation, onError, onSuccess, requestStart, requestEnd, aggregateTypes } = entry;
                const { id, resolution } = requestInformation;

                // use 2D array indices as entryIDs to guarantee uniqueness
                // entryId is used to map batch entries with the appropriate callback
                const entryId = String(`${requestIndex}-${entryIndex}`);

                // save request entry data in functional closure.
                callbackCache[entryId] = {
                  onError: ({ errorMessage: msg = 'batch aggregate error', errorCode: status }) => {
                    onError({
                      id,
                      resolution: parseDuration(resolution),
                      error: { msg, status },
                    });
                  },
                  onSuccess: ({ aggregatedValues }) => {
                    if (aggregatedValues) {
                      onSuccess(
                        [
                          dataStreamFromSiteWise({
                            ...toSiteWiseAssetProperty(id),
                            dataPoints: aggregatedValues
                              .map((assetPropertyValue) => aggregateToDataPoint(assetPropertyValue))
                              .filter(isDefined),
                            resolution: RESOLUTION_TO_MS_MAPPING[resolution],
                          }),
                        ],
                        requestInformation,
                        requestStart,
                        requestEnd
                      );
                    }
                  },
                };

                // BatchGetAssetPropertyAggregatesEntry
                return {
                  ...toSiteWiseAssetProperty(requestInformation.id),
                  aggregateTypes,
                  resolution,
                  startDate: requestStart,
                  endDate: requestEnd,
                  entryId,
                  timeOrdering: TimeOrdering.DESCENDING,
                };
              }),
              maxResults,
              nextToken: prevToken,
            })
          )
          .then((response) => {
            const { errorEntries, successEntries, nextToken } = response;

            // execute the correct callback for each entry
            // empty entries and entries that don't exist in the cache are ignored.
            errorEntries?.forEach((entry) => entry.entryId && callbackCache[entry.entryId]?.onError(entry));
            successEntries?.forEach((entry) => entry.entryId && callbackCache[entry.entryId]?.onSuccess(entry));

            if (nextToken && maxResults !== 1 /* don't paginate if batch result size is 1 */) {
              batchGetAggregatedPropertyDataPointsForProperty({
                entries: batch,
                nextToken,
                client,
              });
            }
          })
      )
  );
};

export const batchGetAggregatedPropertyDataPoints = async ({
  params,
  client,
}: {
  params: AggregatedPropertyParams[];
  client: IoTSiteWiseClient;
}) => {
  const entries: BatchAggregateEntry[] = [];

  // fan out params into individual entries, handling fetchMostRecentBeforeStart
  params.forEach(({ requestInformations, maxResults, onSuccess, onError, aggregateTypes }) => {
    requestInformations
      .filter(({ resolution }) => resolution !== '0')
      .forEach((requestInformation) => {
        const { fetchMostRecentBeforeStart, start, end } = requestInformation;

        entries.push({
          requestInformation,
          aggregateTypes,
          maxResults: fetchMostRecentBeforeStart ? 1 : maxResults,
          onSuccess,
          onError,
          requestStart: fetchMostRecentBeforeStart ? new Date(0, 0, 0) : start,
          requestEnd: fetchMostRecentBeforeStart ? start : end,
        });
      });
  });

  // sort entries to ensure earliest data is fetched first because batch API has a property limit
  entries.sort((a, b) => b.requestInformation.start.getTime() - a.requestInformation.start.getTime());

  if (entries.length > 0) {
    await batchGetAggregatedPropertyDataPointsForProperty({
      entries,
      client,
    });
  }
};
