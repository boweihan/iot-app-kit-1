import {
  BatchGetAssetPropertyValueHistoryCommand,
  BatchGetAssetPropertyValueHistoryErrorEntry,
  BatchGetAssetPropertyValueHistorySuccessEntry,
  IoTSiteWiseClient,
  TimeOrdering,
} from '@aws-sdk/client-iotsitewise';
import { toDataPoint } from '../util/toDataPoint';
import { dataStreamFromSiteWise } from '../dataStreamFromSiteWise';
import { OnSuccessCallback, ErrorCallback, RequestInformationAndRange } from '@iot-app-kit/core';
import { toSiteWiseAssetProperty } from '../util/dataStreamId';
import { isDefined } from '../../common/predicates';
import { HistoricalPropertyParams } from './client';
import { createEntryBatches } from './batch';

type BatchHistoricalEntry = {
  requestInformation: RequestInformationAndRange;
  maxResults?: number;
  onError: ErrorCallback;
  onSuccess: OnSuccessCallback;
};

type EntryMap = {
  [key: string]: { entry: BatchHistoricalEntry; start: Date; end: Date };
};

const handleErrorEntry = (entry: BatchGetAssetPropertyValueHistoryErrorEntry, entryMap: EntryMap) => {
  const { entryId, errorCode, errorMessage } = entry;

  if (entryId) {
    const {
      entry: { onError, requestInformation },
    } = entryMap[entryId];

    onError({
      id: requestInformation.id,
      resolution: 0,
      error: { msg: errorMessage || 'error fetching data', status: errorCode },
    });
  }
};

const handleSuccessEntry = (entry: BatchGetAssetPropertyValueHistorySuccessEntry, entryMap: EntryMap) => {
  const { assetPropertyValueHistory, entryId } = entry;

  if (assetPropertyValueHistory) {
    /** Report the page of data to the data-module */
    const dataPoints = assetPropertyValueHistory
      .map((assetPropertyValue) => toDataPoint(assetPropertyValue))
      .filter(isDefined);

    if (entryId) {
      const {
        entry: { onSuccess, requestInformation },
        start,
        end,
      } = entryMap[entryId];

      onSuccess(
        [dataStreamFromSiteWise({ ...toSiteWiseAssetProperty(requestInformation.id), dataPoints })],
        requestInformation,
        start,
        end
      );
    }
  }
};

const getBatchHistoricalPropertyDataPointsForProperty = async ({
  client,
  entries,
  nextToken: prevToken,
}: {
  client: IoTSiteWiseClient;
  entries: BatchHistoricalEntry[];
  nextToken?: string;
}) => {
  // slice batches by maxResults
  const batches: [BatchHistoricalEntry[], number | undefined][] = [
    // special handling for fetchMostRecentBeforeStart
    [entries.filter(({ requestInformation }) => requestInformation.fetchMostRecentBeforeStart), 1],
    ...createEntryBatches<BatchHistoricalEntry>(
      entries.filter(({ requestInformation }) => !requestInformation.fetchMostRecentBeforeStart)
    ),
  ];

  // initialize entry map for response lookups
  const entryMap: {
    [key: string]: { entry: BatchHistoricalEntry; start: Date; end: Date };
  } = {};

  // create batch requests and cache each entry alongside its requested start and end date
  const responses = await Promise.all(
    batches.map(([batch, maxResults], requestIndex) =>
      batch.length > 0
        ? client.send(
            new BatchGetAssetPropertyValueHistoryCommand({
              entries: batch.map((entry, entryIndex) => {
                const { requestInformation } = entry;
                const { assetId, propertyId } = toSiteWiseAssetProperty(requestInformation.id);

                // caching logic requires immutable request information
                const start = requestIndex === 0 ? new Date(0, 0, 0) : requestInformation.start;
                const end = requestIndex === 0 ? requestInformation.start : requestInformation.end;

                const params = {
                  assetId,
                  propertyId,
                  start,
                  end,
                  entryId: String(`${requestIndex}-${entryIndex}`),
                  timeOrdering: TimeOrdering.DESCENDING,
                };

                // cache entries for lookups later
                entryMap[params.entryId] = { entry, start, end };

                return params;
              }),
              maxResults,
              nextToken: prevToken,
            })
          )
        : undefined
    )
  );

  responses.forEach((response) => {
    if (response) {
      const { errorEntries, successEntries, nextToken } = response;

      errorEntries?.forEach((entry) => handleErrorEntry(entry, entryMap));
      successEntries?.forEach((entry) => handleSuccessEntry(entry, entryMap));

      if (nextToken) {
        // getBatchHistoricalPropertyDataPointsForProperty({
        //   entries,
        //   nextToken,
        //   client,
        // });
      }
    }
  });
};

export const getBatchHistoricalPropertyDataPoints = async ({
  params,
  client,
}: {
  params: HistoricalPropertyParams[];
  client: IoTSiteWiseClient;
}) => {
  const entries: BatchHistoricalEntry[] = [];

  params.forEach(({ requestInformations, maxResults, onSuccess, onError }) => {
    requestInformations
      .filter(({ resolution }) => resolution === '0')
      .forEach((requestInformation) => {
        entries.push({
          requestInformation,
          maxResults,
          onSuccess,
          onError,
        });
      });
  });

  entries.sort((a, b) => b.requestInformation.start.getTime() - a.requestInformation.start.getTime());

  await getBatchHistoricalPropertyDataPointsForProperty({
    entries,
    client,
  });
};
