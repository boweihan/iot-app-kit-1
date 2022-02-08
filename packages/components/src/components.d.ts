/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AnyDataStreamQuery, AssetSummaryQuery, AssetTreeSubscription, IoTAppKit, Provider, SiteWiseAssetTreeQuery, StyleSettingsMap, TimeSeriesDataCallback, TimeSeriesDataRequestSettings } from "@iot-app-kit/core";
import { MinimalViewPortConfig } from "@synchro-charts/core";
import { ColumnDefinition, FilterTexts, ResourceExplorerQuery, SitewiseAssetResource } from "./components/iot-resource-explorer/types";
import { TableProps } from "@awsui/components-react/table";
import { EmptyStateProps, ITreeNode, UseTreeCollection } from "@iot-app-kit/related-table";
import { NonCancelableCustomEvent } from "@awsui/components-react";
export namespace Components {
    interface IotAssetDetails {
        "query": AssetSummaryQuery;
    }
    interface IotAssetTreeDemo {
        "query": SiteWiseAssetTreeQuery;
        "subscription": AssetTreeSubscription;
    }
    interface IotBarChart {
        "appKit": IoTAppKit;
        "isEditing": boolean | undefined;
        "queries": AnyDataStreamQuery[];
        "settings": TimeSeriesDataRequestSettings | undefined;
        "styleSettings": StyleSettingsMap | undefined;
        "viewport": MinimalViewPortConfig;
        "widgetId": string;
    }
    interface IotKpi {
        "appKit": IoTAppKit;
        "isEditing": boolean | undefined;
        "queries": AnyDataStreamQuery[];
        "settings": TimeSeriesDataRequestSettings | undefined;
        "styleSettings": StyleSettingsMap | undefined;
        "viewport": MinimalViewPortConfig;
        "widgetId": string;
    }
    interface IotLineChart {
        "appKit": IoTAppKit;
        "isEditing": boolean | undefined;
        "queries": AnyDataStreamQuery[];
        "settings": TimeSeriesDataRequestSettings | undefined;
        "styleSettings": StyleSettingsMap | undefined;
        "styles": StyleSettingsMap | undefined;
        "viewport": MinimalViewPortConfig;
        "widgetId": string;
    }
    interface IotResourceExplorer {
        "appKit": IoTAppKit;
        "columnDefinitions"?: ColumnDefinition<SitewiseAssetResource>[];
        "empty"?: EmptyStateProps;
        "filterEnabled": boolean;
        "filterTexts"?: FilterTexts;
        "loadingText"?: string;
        "onSelectionChange": (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<unknown>>) => void;
        "paginationEnabled": boolean;
        "query": ResourceExplorerQuery;
        "selectionType"?: TableProps.SelectionType;
        "sortingEnabled": boolean;
        "wrapLines": boolean;
    }
    interface IotResourceExplorerDemo {
    }
    interface IotScatterChart {
        "appKit": IoTAppKit;
        "isEditing": boolean | undefined;
        "queries": AnyDataStreamQuery[];
        "settings": TimeSeriesDataRequestSettings | undefined;
        "styleSettings": StyleSettingsMap | undefined;
        "viewport": MinimalViewPortConfig;
        "widgetId": string;
    }
    interface IotStatusGrid {
        "appKit": IoTAppKit;
        "isEditing": boolean | undefined;
        "queries": AnyDataStreamQuery[];
        "settings": TimeSeriesDataRequestSettings | undefined;
        "styleSettings": StyleSettingsMap | undefined;
        "viewport": MinimalViewPortConfig;
        "widgetId": string;
    }
    interface IotStatusTimeline {
        "appKit": IoTAppKit;
        "isEditing": boolean | undefined;
        "queries": AnyDataStreamQuery[];
        "settings": TimeSeriesDataRequestSettings | undefined;
        "styleSettings": StyleSettingsMap | undefined;
        "viewport": MinimalViewPortConfig;
        "widgetId": string;
    }
    interface IotTable {
        "appKit": IoTAppKit;
        "queries": AnyDataStreamQuery[];
        "settings": TimeSeriesDataRequestSettings | undefined;
        "styleSettings": StyleSettingsMap | undefined;
        "viewport": MinimalViewPortConfig;
        "widgetId": string;
    }
    interface IotTestRoutes {
    }
    interface IotTimeSeriesConnector {
        "provider": Provider<TimeSeriesDataCallback>;
        "renderFunc": TimeSeriesDataCallback;
    }
    interface IotTreeTable {
        "ariaLabels": TableProps.AriaLabels<unknown>;
        "collectionOptions": UseTreeCollection<unknown>;
        "columnDefinitions": TableProps.ColumnDefinition<any>[];
        "empty": EmptyStateProps;
        "filterPlaceholder": string;
        "isItemDisabled": (item: unknown) => boolean;
        "items": unknown[];
        "loading": boolean;
        "loadingText": string;
        "onExpandChildren": (node: ITreeNode<any>) => void;
        "onSelectionChange": (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<unknown>>) => void;
        "onSortingChange": (event: NonCancelableCustomEvent<TableProps.SortingState<unknown>>) => void;
        "resizableColumns": boolean;
        "selectionType": TableProps.SelectionType;
        "sortingDisabled": boolean;
        "wrapLines": boolean;
    }
    interface IotTreeTableDemo {
    }
    interface SitewiseResourceExplorer {
        "appKit": IoTAppKit;
        "columnDefinitions": ColumnDefinition<any>[];
        "empty"?: EmptyStateProps;
        "filterEnabled": boolean;
        "filterTexts"?: FilterTexts;
        "loadingText"?: string;
        "onSelectionChange": (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<unknown>>) => void;
        "paginationEnabled": boolean;
        "query": SiteWiseAssetTreeQuery;
        "selectionType"?: TableProps.SelectionType;
        "sortingEnabled": boolean;
        "wrapLines": boolean;
    }
    interface TestingGround {
    }
}
declare global {
    interface HTMLIotAssetDetailsElement extends Components.IotAssetDetails, HTMLStencilElement {
    }
    var HTMLIotAssetDetailsElement: {
        prototype: HTMLIotAssetDetailsElement;
        new (): HTMLIotAssetDetailsElement;
    };
    interface HTMLIotAssetTreeDemoElement extends Components.IotAssetTreeDemo, HTMLStencilElement {
    }
    var HTMLIotAssetTreeDemoElement: {
        prototype: HTMLIotAssetTreeDemoElement;
        new (): HTMLIotAssetTreeDemoElement;
    };
    interface HTMLIotBarChartElement extends Components.IotBarChart, HTMLStencilElement {
    }
    var HTMLIotBarChartElement: {
        prototype: HTMLIotBarChartElement;
        new (): HTMLIotBarChartElement;
    };
    interface HTMLIotKpiElement extends Components.IotKpi, HTMLStencilElement {
    }
    var HTMLIotKpiElement: {
        prototype: HTMLIotKpiElement;
        new (): HTMLIotKpiElement;
    };
    interface HTMLIotLineChartElement extends Components.IotLineChart, HTMLStencilElement {
    }
    var HTMLIotLineChartElement: {
        prototype: HTMLIotLineChartElement;
        new (): HTMLIotLineChartElement;
    };
    interface HTMLIotResourceExplorerElement extends Components.IotResourceExplorer, HTMLStencilElement {
    }
    var HTMLIotResourceExplorerElement: {
        prototype: HTMLIotResourceExplorerElement;
        new (): HTMLIotResourceExplorerElement;
    };
    interface HTMLIotResourceExplorerDemoElement extends Components.IotResourceExplorerDemo, HTMLStencilElement {
    }
    var HTMLIotResourceExplorerDemoElement: {
        prototype: HTMLIotResourceExplorerDemoElement;
        new (): HTMLIotResourceExplorerDemoElement;
    };
    interface HTMLIotScatterChartElement extends Components.IotScatterChart, HTMLStencilElement {
    }
    var HTMLIotScatterChartElement: {
        prototype: HTMLIotScatterChartElement;
        new (): HTMLIotScatterChartElement;
    };
    interface HTMLIotStatusGridElement extends Components.IotStatusGrid, HTMLStencilElement {
    }
    var HTMLIotStatusGridElement: {
        prototype: HTMLIotStatusGridElement;
        new (): HTMLIotStatusGridElement;
    };
    interface HTMLIotStatusTimelineElement extends Components.IotStatusTimeline, HTMLStencilElement {
    }
    var HTMLIotStatusTimelineElement: {
        prototype: HTMLIotStatusTimelineElement;
        new (): HTMLIotStatusTimelineElement;
    };
    interface HTMLIotTableElement extends Components.IotTable, HTMLStencilElement {
    }
    var HTMLIotTableElement: {
        prototype: HTMLIotTableElement;
        new (): HTMLIotTableElement;
    };
    interface HTMLIotTestRoutesElement extends Components.IotTestRoutes, HTMLStencilElement {
    }
    var HTMLIotTestRoutesElement: {
        prototype: HTMLIotTestRoutesElement;
        new (): HTMLIotTestRoutesElement;
    };
    interface HTMLIotTimeSeriesConnectorElement extends Components.IotTimeSeriesConnector, HTMLStencilElement {
    }
    var HTMLIotTimeSeriesConnectorElement: {
        prototype: HTMLIotTimeSeriesConnectorElement;
        new (): HTMLIotTimeSeriesConnectorElement;
    };
    interface HTMLIotTreeTableElement extends Components.IotTreeTable, HTMLStencilElement {
    }
    var HTMLIotTreeTableElement: {
        prototype: HTMLIotTreeTableElement;
        new (): HTMLIotTreeTableElement;
    };
    interface HTMLIotTreeTableDemoElement extends Components.IotTreeTableDemo, HTMLStencilElement {
    }
    var HTMLIotTreeTableDemoElement: {
        prototype: HTMLIotTreeTableDemoElement;
        new (): HTMLIotTreeTableDemoElement;
    };
    interface HTMLSitewiseResourceExplorerElement extends Components.SitewiseResourceExplorer, HTMLStencilElement {
    }
    var HTMLSitewiseResourceExplorerElement: {
        prototype: HTMLSitewiseResourceExplorerElement;
        new (): HTMLSitewiseResourceExplorerElement;
    };
    interface HTMLTestingGroundElement extends Components.TestingGround, HTMLStencilElement {
    }
    var HTMLTestingGroundElement: {
        prototype: HTMLTestingGroundElement;
        new (): HTMLTestingGroundElement;
    };
    interface HTMLElementTagNameMap {
        "iot-asset-details": HTMLIotAssetDetailsElement;
        "iot-asset-tree-demo": HTMLIotAssetTreeDemoElement;
        "iot-bar-chart": HTMLIotBarChartElement;
        "iot-kpi": HTMLIotKpiElement;
        "iot-line-chart": HTMLIotLineChartElement;
        "iot-resource-explorer": HTMLIotResourceExplorerElement;
        "iot-resource-explorer-demo": HTMLIotResourceExplorerDemoElement;
        "iot-scatter-chart": HTMLIotScatterChartElement;
        "iot-status-grid": HTMLIotStatusGridElement;
        "iot-status-timeline": HTMLIotStatusTimelineElement;
        "iot-table": HTMLIotTableElement;
        "iot-test-routes": HTMLIotTestRoutesElement;
        "iot-time-series-connector": HTMLIotTimeSeriesConnectorElement;
        "iot-tree-table": HTMLIotTreeTableElement;
        "iot-tree-table-demo": HTMLIotTreeTableDemoElement;
        "sitewise-resource-explorer": HTMLSitewiseResourceExplorerElement;
        "testing-ground": HTMLTestingGroundElement;
    }
}
declare namespace LocalJSX {
    interface IotAssetDetails {
        "query"?: AssetSummaryQuery;
    }
    interface IotAssetTreeDemo {
        "query"?: SiteWiseAssetTreeQuery;
        "subscription"?: AssetTreeSubscription;
    }
    interface IotBarChart {
        "appKit"?: IoTAppKit;
        "isEditing"?: boolean | undefined;
        "queries"?: AnyDataStreamQuery[];
        "settings"?: TimeSeriesDataRequestSettings | undefined;
        "styleSettings"?: StyleSettingsMap | undefined;
        "viewport"?: MinimalViewPortConfig;
        "widgetId"?: string;
    }
    interface IotKpi {
        "appKit"?: IoTAppKit;
        "isEditing"?: boolean | undefined;
        "queries"?: AnyDataStreamQuery[];
        "settings"?: TimeSeriesDataRequestSettings | undefined;
        "styleSettings"?: StyleSettingsMap | undefined;
        "viewport"?: MinimalViewPortConfig;
        "widgetId"?: string;
    }
    interface IotLineChart {
        "appKit"?: IoTAppKit;
        "isEditing"?: boolean | undefined;
        "queries"?: AnyDataStreamQuery[];
        "settings"?: TimeSeriesDataRequestSettings | undefined;
        "styleSettings"?: StyleSettingsMap | undefined;
        "styles"?: StyleSettingsMap | undefined;
        "viewport"?: MinimalViewPortConfig;
        "widgetId"?: string;
    }
    interface IotResourceExplorer {
        "appKit"?: IoTAppKit;
        "columnDefinitions"?: ColumnDefinition<SitewiseAssetResource>[];
        "empty"?: EmptyStateProps;
        "filterEnabled"?: boolean;
        "filterTexts"?: FilterTexts;
        "loadingText"?: string;
        "onSelectionChange"?: (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<unknown>>) => void;
        "paginationEnabled"?: boolean;
        "query"?: ResourceExplorerQuery;
        "selectionType"?: TableProps.SelectionType;
        "sortingEnabled"?: boolean;
        "wrapLines"?: boolean;
    }
    interface IotResourceExplorerDemo {
    }
    interface IotScatterChart {
        "appKit"?: IoTAppKit;
        "isEditing"?: boolean | undefined;
        "queries"?: AnyDataStreamQuery[];
        "settings"?: TimeSeriesDataRequestSettings | undefined;
        "styleSettings"?: StyleSettingsMap | undefined;
        "viewport"?: MinimalViewPortConfig;
        "widgetId"?: string;
    }
    interface IotStatusGrid {
        "appKit"?: IoTAppKit;
        "isEditing"?: boolean | undefined;
        "queries"?: AnyDataStreamQuery[];
        "settings"?: TimeSeriesDataRequestSettings | undefined;
        "styleSettings"?: StyleSettingsMap | undefined;
        "viewport"?: MinimalViewPortConfig;
        "widgetId"?: string;
    }
    interface IotStatusTimeline {
        "appKit"?: IoTAppKit;
        "isEditing"?: boolean | undefined;
        "queries"?: AnyDataStreamQuery[];
        "settings"?: TimeSeriesDataRequestSettings | undefined;
        "styleSettings"?: StyleSettingsMap | undefined;
        "viewport"?: MinimalViewPortConfig;
        "widgetId"?: string;
    }
    interface IotTable {
        "appKit"?: IoTAppKit;
        "queries"?: AnyDataStreamQuery[];
        "settings"?: TimeSeriesDataRequestSettings | undefined;
        "styleSettings"?: StyleSettingsMap | undefined;
        "viewport"?: MinimalViewPortConfig;
        "widgetId"?: string;
    }
    interface IotTestRoutes {
    }
    interface IotTimeSeriesConnector {
        "provider"?: Provider<TimeSeriesDataCallback>;
        "renderFunc"?: TimeSeriesDataCallback;
    }
    interface IotTreeTable {
        "ariaLabels"?: TableProps.AriaLabels<unknown>;
        "collectionOptions": UseTreeCollection<unknown>;
        "columnDefinitions": TableProps.ColumnDefinition<any>[];
        "empty"?: EmptyStateProps;
        "filterPlaceholder"?: string;
        "isItemDisabled"?: (item: unknown) => boolean;
        "items": unknown[];
        "loading"?: boolean;
        "loadingText"?: string;
        "onExpandChildren"?: (node: ITreeNode<any>) => void;
        "onSelectionChange"?: (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<unknown>>) => void;
        "onSortingChange"?: (event: NonCancelableCustomEvent<TableProps.SortingState<unknown>>) => void;
        "resizableColumns"?: boolean;
        "selectionType"?: TableProps.SelectionType;
        "sortingDisabled"?: boolean;
        "wrapLines"?: boolean;
    }
    interface IotTreeTableDemo {
    }
    interface SitewiseResourceExplorer {
        "appKit"?: IoTAppKit;
        "columnDefinitions"?: ColumnDefinition<any>[];
        "empty"?: EmptyStateProps;
        "filterEnabled"?: boolean;
        "filterTexts"?: FilterTexts;
        "loadingText"?: string;
        "onSelectionChange"?: (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<unknown>>) => void;
        "paginationEnabled"?: boolean;
        "query"?: SiteWiseAssetTreeQuery;
        "selectionType"?: TableProps.SelectionType;
        "sortingEnabled"?: boolean;
        "wrapLines"?: boolean;
    }
    interface TestingGround {
    }
    interface IntrinsicElements {
        "iot-asset-details": IotAssetDetails;
        "iot-asset-tree-demo": IotAssetTreeDemo;
        "iot-bar-chart": IotBarChart;
        "iot-kpi": IotKpi;
        "iot-line-chart": IotLineChart;
        "iot-resource-explorer": IotResourceExplorer;
        "iot-resource-explorer-demo": IotResourceExplorerDemo;
        "iot-scatter-chart": IotScatterChart;
        "iot-status-grid": IotStatusGrid;
        "iot-status-timeline": IotStatusTimeline;
        "iot-table": IotTable;
        "iot-test-routes": IotTestRoutes;
        "iot-time-series-connector": IotTimeSeriesConnector;
        "iot-tree-table": IotTreeTable;
        "iot-tree-table-demo": IotTreeTableDemo;
        "sitewise-resource-explorer": SitewiseResourceExplorer;
        "testing-ground": TestingGround;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "iot-asset-details": LocalJSX.IotAssetDetails & JSXBase.HTMLAttributes<HTMLIotAssetDetailsElement>;
            "iot-asset-tree-demo": LocalJSX.IotAssetTreeDemo & JSXBase.HTMLAttributes<HTMLIotAssetTreeDemoElement>;
            "iot-bar-chart": LocalJSX.IotBarChart & JSXBase.HTMLAttributes<HTMLIotBarChartElement>;
            "iot-kpi": LocalJSX.IotKpi & JSXBase.HTMLAttributes<HTMLIotKpiElement>;
            "iot-line-chart": LocalJSX.IotLineChart & JSXBase.HTMLAttributes<HTMLIotLineChartElement>;
            "iot-resource-explorer": LocalJSX.IotResourceExplorer & JSXBase.HTMLAttributes<HTMLIotResourceExplorerElement>;
            "iot-resource-explorer-demo": LocalJSX.IotResourceExplorerDemo & JSXBase.HTMLAttributes<HTMLIotResourceExplorerDemoElement>;
            "iot-scatter-chart": LocalJSX.IotScatterChart & JSXBase.HTMLAttributes<HTMLIotScatterChartElement>;
            "iot-status-grid": LocalJSX.IotStatusGrid & JSXBase.HTMLAttributes<HTMLIotStatusGridElement>;
            "iot-status-timeline": LocalJSX.IotStatusTimeline & JSXBase.HTMLAttributes<HTMLIotStatusTimelineElement>;
            "iot-table": LocalJSX.IotTable & JSXBase.HTMLAttributes<HTMLIotTableElement>;
            "iot-test-routes": LocalJSX.IotTestRoutes & JSXBase.HTMLAttributes<HTMLIotTestRoutesElement>;
            "iot-time-series-connector": LocalJSX.IotTimeSeriesConnector & JSXBase.HTMLAttributes<HTMLIotTimeSeriesConnectorElement>;
            "iot-tree-table": LocalJSX.IotTreeTable & JSXBase.HTMLAttributes<HTMLIotTreeTableElement>;
            "iot-tree-table-demo": LocalJSX.IotTreeTableDemo & JSXBase.HTMLAttributes<HTMLIotTreeTableDemoElement>;
            "sitewise-resource-explorer": LocalJSX.SitewiseResourceExplorer & JSXBase.HTMLAttributes<HTMLSitewiseResourceExplorerElement>;
            "testing-ground": LocalJSX.TestingGround & JSXBase.HTMLAttributes<HTMLTestingGroundElement>;
        }
    }
}
