// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ArgiPie = () => {
  const data = [
    {
      id: "Nông trại",
      label: "Nông trại",
      value: 52,
      color: "red", // Change color to red
    },
    {
      id: "Khu đất",
      label: "Khu đất",
      value: 20,
      color: "green", // Change color to green
    },
    {
      id: "Vùng đất",
      label: "Vùng đất",
      value: 25,
      color: "yellow", // Change color to yellow
    },
    {
      id: "Nhân viên",
      label: "Nhân viên",
      value: 40,
      color: "orange", // Change color to orange
    },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={{ theme: "background" }}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ theme: "background" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      colors={["#148c70", "#4750bd", "#f3f225", "#ce67e7"]} // Specify colors directly
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 80,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
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
  );
};

export default ArgiPie;
