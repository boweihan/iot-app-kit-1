import { Component, Prop, h, State, Listen } from '@stencil/core';
import { MinimalViewPortConfig, DataStream as SynchroChartsDataStream } from '@synchro-charts/core';
import {
  AnyDataStreamQuery,
  TimeSeriesDataRequestSettings,
  StyleSettingsMap,
  IoTAppKit,
  SiteWiseTimeSeriesDataProvider,
  query,
} from '@iot-app-kit/core';
import { bindStylesToDataStreams } from '../common/bindStylesToDataStreams';

const DEFAULT_VIEWPORT = { duration: 10 * 1000 * 60 };

@Component({
  tag: 'iot-status-grid',
  shadow: false,
})
export class IotStatusGrid {
  @Prop() appKit: IoTAppKit;

  @Prop() queries: AnyDataStreamQuery[];

  @Prop() viewport: MinimalViewPortConfig = DEFAULT_VIEWPORT;

  @Prop() widgetId: string;

  @Prop() isEditing: boolean | undefined;

  @Prop() settings: TimeSeriesDataRequestSettings | undefined;

  @Prop() styleSettings: StyleSettingsMap | undefined;

  @State() provider: SiteWiseTimeSeriesDataProvider;

  componentWillLoad() {
    this.provider = query.iotsitewise
      .timeSeriesData({
        queries: this.queries,
        request: {
          settings: {
            ...this.settings,
            fetchMostRecentBeforeEnd: true,
          },
          viewport: this.viewport,
        },
      })
      .build(this.appKit.session(this.widgetId));
  }

  @Listen('dateRangeChange')
  private handleDateRangeChange({ detail: [start, end, lastUpdatedBy] }: { detail: [Date, Date, string | undefined] }) {
    this.provider.updateViewport({ start, end, lastUpdatedBy });
  }

  render() {
    return (
      <iot-time-series-connector
        provider={this.provider}
        renderFunc={({ dataStreams, viewport }) => (
          <sc-status-grid
            dataStreams={
              bindStylesToDataStreams({ dataStreams, styleSettings: this.styleSettings }) as SynchroChartsDataStream[]
            }
            viewport={viewport}
            isEditing={this.isEditing}
            widgetId={this.widgetId}
          />
        )}
      />
    );
  }
}
