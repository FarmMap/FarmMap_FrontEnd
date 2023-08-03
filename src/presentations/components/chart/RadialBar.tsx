import React from "react";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { mockBarData as data } from "./mockData";
import { tokens } from "./theme";
import { Grid, useTheme } from "@mui/material";

const RadialBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid whiteSpace={"pre-wrap"} height={"100%"}>
      <ResponsiveRadialBar
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        data={data}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 25, right: 40, bottom: 40, left: 40 }}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 80,
            translateY: 1000,
            itemsSpacing: 6,
            itemDirection: "left-to-right",
            itemWidth: 0,
            itemHeight: 18,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Grid>
  );
};

export default RadialBar;
