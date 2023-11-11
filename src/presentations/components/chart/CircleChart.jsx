import * as React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  Inject,
  AccumulationLegend,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

const CircleChart = () => {
  const data = [
    { x: "Nông trại", y: 52, text: "52" },
    { x: "Khu đất", y: 50, text: "50" },
    { x: "Vùng đất", y: 25, text: "25" },
    { x: "Nhân viên", y: 20, text: "20 " },
  ];

  const tooltipRender = (args) => {
    if (args.point.index === 3) {
      args.text = args.point.x + "" + ":" + args.point.y;
      args.textStyle.color = "#fff";
    }
  };
  return (
    <AccumulationChartComponent
      id="charts"
      legendSettings={{ position: "Bottom" }}
      tooltip={{ enable: true }}
      tooltipRender={tooltipRender}
      enableSmartLabels="true"
    >
      <Inject
        services={[
          AccumulationDataLabel,
          AccumulationTooltip,
          AccumulationLegend,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={data}
          xName="x"
          yName="y"
          dataLabel={{ visible: "true" }}
        ></AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default CircleChart;
