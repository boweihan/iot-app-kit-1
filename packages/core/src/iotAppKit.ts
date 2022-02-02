import { IotAppKitDataModule } from './data-module/IotAppKitDataModule';
import { sitewiseSdk } from './iotsitewise/time-series-data/sitewise-sdk';
import {
  DataModuleSubscription,
  DataStream,
  DataStreamCallback,
  DataStreamQuery,
  SiteWiseAssetDataSource,
  SubscriptionUpdate,
} from './data-module/types';
import { createSiteWiseAssetDataSource } from './iotsitewise/time-series-data/asset-data-source';
import { SiteWiseAssetModule, SiteWiseAssetTreeModule } from './asset-modules';
import { SiteWiseDataStreamQuery } from './iotsitewise/time-series-data/types';
import { DescribeAssetModelResponse } from '@aws-sdk/client-iotsitewise';
import { completeDataStreams } from './completeDataStreams';
import { IoTAppKitSession, IoTAppKitInitInputs } from './interface.d';
import { createDataSource } from './iotsitewise/time-series-data';
import { subscribeToTimeSeriesData } from './iotsitewise/time-series-data/coordinator';

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
      subscribeToTimeSeriesData: subscribeToTimeSeriesData(dataModule, siteWiseAssetModuleSession),
      registerDataSource: dataModule.registerDataSource,
    }),
  };
};
