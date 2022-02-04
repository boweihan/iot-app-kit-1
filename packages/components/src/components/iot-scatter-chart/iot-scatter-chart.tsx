import { Component, Prop, h } from '@stencil/core';
import { MinimalViewPortConfig, DataStream as SynchroChartsDataStream } from '@synchro-charts/core';
import {
  AnyDataStreamQuery,
  DataModule,
  TimeSeriesDataRequestSettings,
  StyleSettingsMap,
  IoTAppKitSession,
} from '@iot-app-kit/core';

const DEFAULT_VIEWPORT = { duration: 10 * 1000 * 60 };

@Component({
  tag: 'iot-scatter-chart',
  shadow: false,
})
export class IotScatterChart {
  @Prop() appKitSession: IoTAppKitSession;

  @Prop() queries: AnyDataStreamQuery[];

  @Prop() viewport: MinimalViewPortConfig = DEFAULT_VIEWPORT;

  @Prop() widgetId: string;

  @Prop() isEditing: boolean | undefined;

  @Prop() settings: TimeSeriesDataRequestSettings | undefined;

  @Prop() styleSettings: StyleSettingsMap | undefined;

  getSettings(): TimeSeriesDataRequestSettings {
    return {
      ...this.settings,
      fetchFromStartToEnd: true,
    };
  }

  render() {
    const settings = this.getSettings();
    return (
      <iot-connector
        appKitSession={this.appKitSession}
        queries={this.queries}
        styleSettings={this.styleSettings}
        request={{
          settings,
          viewport: this.viewport,
        }}
        renderFunc={({ dataStreams }) => (
          <sc-scatter-chart
            dataStreams={dataStreams as SynchroChartsDataStream[]}
            viewport={this.viewport}
            isEditing={this.isEditing}
            widgetId={this.widgetId}
          />
        )}
      />
    );
  }
}
