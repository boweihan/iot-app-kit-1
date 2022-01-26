import { IotAppKitDataModule } from './data-module/IotAppKitDataModule';
import { sitewiseSdk } from './data-sources/site-wise/sitewise-sdk';
import { createDataSource } from './data-sources';
import {
  DataModuleSubscription,
  DataStream,
  DataStreamCallback,
  DataStreamQuery,
  SiteWiseAssetDataSource,
  SubscriptionUpdate,
} from './data-module/types';
import { createSiteWiseAssetDataSource } from './data-sources/site-wise/asset-data-source';
import { SiteWiseAssetModule, SiteWiseAssetTreeModule } from './asset-modules';
import { SiteWiseDataStreamQuery } from './data-sources/site-wise/types';
import { DescribeAssetModelResponse } from '@aws-sdk/client-iotsitewise';
import { completeDataStreams } from './completeDataStreams';
import { IoTAppKitSession, IoTAppKitInitInputs } from './interface.d';

/**
 * Initialize IoT App Kit
 *
 * @param awsCredentials - https://www.npmjs.com/package/@aws-sdk/credential-providers
 * @param awsRegion - Region for AWS based data sources to point towards, i.e. us-east-1
 */
export const initialize = (input: IoTAppKitInitInputs) => {
  const dataModule = new IotAppKitDataModule();
  const siteWiseSdk =
    'iotSiteWiseClient' in input ? input.iotSiteWiseClient : sitewiseSdk(input.awsCredentials, input.awsRegion);

  const assetDataSource: SiteWiseAssetDataSource = createSiteWiseAssetDataSource(siteWiseSdk);
  const siteWiseAssetModule = new SiteWiseAssetModule(assetDataSource);
  const siteWiseAssetModuleSession = siteWiseAssetModule.startSession();

  if (input.registerDataSources) {
    /** Automatically registered data sources */
    dataModule.registerDataSource(createDataSource(siteWiseSdk));
  }

  return {
    session: (): IoTAppKitSession => ({
      subscribeToDataStreams: <Query extends DataStreamQuery>(
        { queries, request }: DataModuleSubscription<Query>,
        callback: DataStreamCallback
      ) => {
        let dataStreams: DataStream[] = [];
        const assetModels: Record<string, DescribeAssetModelResponse> = {};

        const siteWiseQueries = queries as unknown as SiteWiseDataStreamQuery[];

        const emit = () => {
          callback(completeDataStreams({ dataStreams, assetModels }));
        };

        const { update, unsubscribe } = dataModule.subscribeToDataStreams(
          { queries, request },
          (updatedDataStreams) => {
            dataStreams = updatedDataStreams;
            emit();
          }
        );

        siteWiseQueries.forEach((query) => {
          query.assets.forEach((asset) => {
            siteWiseAssetModuleSession
              .fetchAssetSummary({ assetId: asset.assetId })
              .then((assetSummary) => {
                if (assetSummary.assetModelId != null) {
                  return siteWiseAssetModuleSession.fetchAssetModel({ assetModelId: assetSummary.assetModelId });
                }
              })
              .then((assetModelResponse) => {
                if (assetModelResponse) {
                  assetModels[asset.assetId] = assetModelResponse;
                  emit();
                }
              });
          });
        });

        return {
          unsubscribe: () => {
            unsubscribe();
          },
          update: (subscriptionUpdate: SubscriptionUpdate<Query>) => {
            update(subscriptionUpdate);
          },
        };
      },
      registerDataSource: dataModule.registerDataSource,
    }),
  };
};
