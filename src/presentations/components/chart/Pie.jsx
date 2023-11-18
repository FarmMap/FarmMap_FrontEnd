// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = () => {
  const data = [
    {
      id: "Phiếu đã duyệt",
      label: "Phiếu đã duyệt",
      value: 50,
      color: "red",
    },
    {
      id: "Phiếu chờ duyệt",
      label: "Phiếu chờ duyệt",
      value: 20,
      color: "hsl(41, 70%, 50%)",
    },
    {
      id: "Đã hủy phiếu",
      label: "Đã hủy phiếu",
      value: 30,
      color: "hsl(14, 70%, 50%)",
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
      colors={["#c06b84", "#f67180", "#4a87b9"]} // Specify colors directly
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
          itemWidth: 114,
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

export default MyResponsivePie;
