const STRING_ASSET_ID = '23b06317-215c-4b30-a2f1-d7294fd9d8a5';

export const DEMO_TURBINE_ASSET_1 = '23b06317-215c-4b30-a2f1-d7294fd9d8a5';
export const DEMO_TURBINE_ASSET_1_PROPERTY_1 = '6f106e63-e7c4-474f-be09-84bd88923423';
export const DEMO_TURBINE_ASSET_1_PROPERTY_2 = 'cb6d53bf-abf4-43a4-9e99-6dd1f5b09db1';
export const DEMO_TURBINE_ASSET_1_PROPERTY_3 = '33ba6e47-18c0-4d6e-8e89-bc92c9307ac9';
export const DEMO_TURBINE_ASSET_1_PROPERTY_4 = '729479fb-8720-4a70-bd55-2a9f9eaaa32e';

export const ASSET_DETAILS_QUERY = {
  assetId: STRING_ASSET_ID,
};

const AGGREGATED_DATA_ASSET = STRING_ASSET_ID;
const AGGREGATED_DATA_PROPERTY = 'b1616ab4-7526-4c0a-85e2-a137cf57d668';
const AGGREGATED_DATA_PROPERTY_2 = '729479fb-8720-4a70-bd55-2a9f9eaaa32e4';

export const AGGREGATED_DATA_QUERY = {
  assets: [
    {
      assetId: AGGREGATED_DATA_ASSET,
      properties: [
        { propertyId: AGGREGATED_DATA_PROPERTY, resolution: '0', refId: 'testing' },
        { propertyId: AGGREGATED_DATA_PROPERTY_2 },
      ],
    },
  ],
};

// From demo turbine asset, found at https://p-rlvy2rj8.app.iotsitewise.aws/
// These resources will eventually expire and need to be manually updated,
// because the demo turbine assets expire after 7 days.
