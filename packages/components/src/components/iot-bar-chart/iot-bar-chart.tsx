import { Component, Prop, h, Listen, State, Watch } from '@stencil/core';
import uuid from 'uuid';
import { Annotations, DataStream as SynchroChartsDataStream } from '@synchro-charts/core';
import {
  TimeSeriesDataRequestSettings,
  StyleSettingsMap,
  TimeQuery,
  combineProviders,
  Viewport,
  ProviderWithViewport,
  TimeSeriesData,
  TimeSeriesDataRequest,
  HOUR_IN_MS,
  DAY_IN_MS,
} from '@iot-app-kit/core';

@Component({
  tag: 'iot-bar-chart',
  shadow: false,
})
export class IotBarChart {
  @Prop() annotations: Annotations;

  @Prop() queries!: TimeQuery<TimeSeriesData[], TimeSeriesDataRequest>[];

  @Prop() viewport!: Viewport;

  @Prop() settings: TimeSeriesDataRequestSettings = {};

  @Prop() widgetId: string = uuid.v4();

  @Prop() isEditing: boolean | undefined;

  @Prop() styleSettings: StyleSettingsMap | undefined;

  @State() provider: ProviderWithViewport<TimeSeriesData[]>;

  private defaultSettings: TimeSeriesDataRequestSettings = {
    fetchFromStartToEnd: true,
    resolution: {
      [0]: '1m',
      [HOUR_IN_MS]: '1hr',
      [DAY_IN_MS * 5]: '1day',
    },
  };

  buildProvider() {
    this.provider = combineProviders(
      this.queries.map((query) =>
        query.build(this.widgetId, {
          viewport: this.viewport,
          settings: {
            ...this.defaultSettings,
            ...this.settings,
          },
        })
      )
    );
  }

  componentWillLoad() {
    this.buildProvider();
  }

  @Watch('queries')
  @Watch('settings')
  @Watch('viewport')
  private onPropUpdate() {
    this.buildProvider();
  }

  @Listen('dateRangeChange')
  private handleDateRangeChange({ detail: [start, end, lastUpdatedBy] }: { detail: [Date, Date, string | undefined] }) {
    this.provider.updateViewport({ start, end, lastUpdatedBy });
  }

  render() {
    return (
      <iot-time-series-connector
        provider={this.provider}
        styleSettings={this.styleSettings}
        renderFunc={({ dataStreams }) => (
          <sc-bar-chart
            dataStreams={dataStreams as SynchroChartsDataStream[]}
            annotations={this.annotations}
            viewport={this.viewport}
            isEditing={this.isEditing}
            widgetId={this.widgetId}
          />
        )}
      />
    );
  }
}
