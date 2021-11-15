const STRING_ASSET_ID = '9a9ca8e2-779d-443f-93a9-c287fd8f9c66';
const STRING_PROPERTY_ID = '9530e220-b353-4331-b4b3-cf0949c8684d';

export const DEMO_TURBINE_ASSET_1 = '25963bcd-cde2-44ef-8e59-7b54da426409';

export const DEMO_TURBINE_ASSET_1_PROPERTY_1 = 'b86ad68c-d102-48df-8ea7-935241112eff';
export const DEMO_TURBINE_ASSET_1_PROPERTY_2 = 'a8506274-bf65-48dc-a382-1f941e2360db';
export const DEMO_TURBINE_ASSET_1_PROPERTY_3 = '6d55449b-d0ff-4233-9f02-fc53d6318954';
export const DEMO_TURBINE_ASSET_1_PROPERTY_4 = '8d9ed440-a8dd-48bd-a35f-70db6f2e860c';

export const STRING_QUERY = {
  source: 'site-wise',
  assets: [{ assetId: STRING_ASSET_ID, propertyIds: [STRING_PROPERTY_ID] }],
};

export const NUMBER_QUERY = {
  source: 'site-wise',
  assets: [
    {
      assetId: DEMO_TURBINE_ASSET_1,
      propertyIds: [DEMO_TURBINE_ASSET_1_PROPERTY_1, DEMO_TURBINE_ASSET_1_PROPERTY_4],
    },
  ],
};

// From demo turbine asset, found at https://p-rlvy2rj8.app.iotsitewise.aws/
// These resources will eventually expire and need to be manually updated,
// because the demo turbine assets expire after 7 days.
