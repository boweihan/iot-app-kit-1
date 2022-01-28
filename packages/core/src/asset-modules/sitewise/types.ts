/**
 * These are the types of high level queries that you can make to the SiteWise asset module
 */
import { AssetPropertyValue, AssetSummary, DescribeAssetModelResponse } from '@aws-sdk/client-iotsitewise';
import { Subscription } from 'rxjs';

export type AssetQuery = {};

export type AssetSummaryQuery = AssetQuery & {
  assetId: string;
};
export const isAssetSummaryQuery = (query: AssetQuery): query is AssetSummaryQuery =>
  (query as AssetSummaryQuery).assetId != undefined && !(query as AssetPropertyValueQuery).propertyId;

export type AssetModelQuery = AssetQuery & {
  assetModelId: string;
};
export const isAssetModelQuery = (query: AssetQuery): query is AssetModelQuery =>
  (query as AssetModelQuery).assetModelId != undefined;

export type AssetPropertyValueQuery = AssetQuery & {
  assetId: string;
  propertyId: string;
};
export const isAssetPropertyValueQuery = (query: AssetQuery): query is AssetPropertyValueQuery =>
  (query as AssetPropertyValueQuery).propertyId != undefined && (query as AssetPropertyValueQuery).assetId != undefined;

export type AssetHierarchyQuery = AssetQuery & {
  assetId?: string;
  assetHierarchyId: string;
};

export function assetHierarchyQueryKey(query: AssetHierarchyQuery): string {
  return (query.assetId ? query.assetId + ':' : '') + query.assetHierarchyId;
}
export const isAssetHierarchyQuery = (query: AssetQuery): query is AssetHierarchyQuery =>
  (query as AssetHierarchyQuery).assetHierarchyId != undefined;

export enum LoadingStateEnum {
  NOT_LOADED,
  LOADING,
  PAUSED,
  LOADED,
}

export const HIERARCHY_ROOT_ID = 'HIERARCHY_ROOT_ID';

export type CachedAssetSummaryBlock = {
  assetIds: string[];
  loadingStage: LoadingStateEnum;
  paginationToken: string | undefined;
};

export type HierarchyAssetSummaryList = {
  assetHierarchyId: string;
  assets: AssetSummary[];
  loadingState: LoadingStateEnum;
};

export interface SiteWiseAssetModuleInterface {
  startSession(): SiteWiseAssetSessionInterface;
}

export interface SiteWiseAssetSessionInterface {
  fetchAssetSummary(query: AssetSummaryQuery): Promise<AssetSummary>;
  requestAssetSummary(query: AssetSummaryQuery, observer: (assetSummary: AssetSummary) => void): Subscription;

  fetchAssetModel(query: AssetModelQuery): Promise<DescribeAssetModelResponse>;
  requestAssetModel(query: AssetModelQuery, observer: (assetSummary: DescribeAssetModelResponse) => void): Subscription;

  fetchAssetPropertyValue(query: AssetPropertyValueQuery): Promise<AssetPropertyValue>;
  requestAssetPropertyValue(
    query: AssetPropertyValueQuery,
    observer: (assetSummary: AssetPropertyValue) => void
  ): Subscription;

  fetchAssetHierarchy(query: AssetHierarchyQuery): Promise<HierarchyAssetSummaryList>;
  requestAssetHierarchy(
    query: AssetHierarchyQuery,
    observer: (assetSummary: HierarchyAssetSummaryList) => void
  ): Subscription;

  fetchRootAssets(): Promise<HierarchyAssetSummaryList>;
  requestRootAssets(observer: (assetSummary: HierarchyAssetSummaryList) => void): Subscription;

  close(): void;
}
