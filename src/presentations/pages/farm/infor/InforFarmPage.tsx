// External files

import { Grid } from "@mui/material";
import DefaultWebLayOut from "../../../components/defaultWebLayOut";
import React from "react";

import InforFarmPageTable from "./InforFarmPageTable";

import GoogleMapReact from "google-map-react";

interface AnyReactComponentProps {
  text: String;
  lat: number;
  lng: number;
}

const AnyReactComponent = (props: AnyReactComponentProps) => (
  <div>{props.text}</div>
);

// Internal files

//Style

const InforPage = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <DefaultWebLayOut>
      <Grid>
        <Grid className="" style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBvl7ZGXP0I7tJxiflf3__69qkclZ4P1D8",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </Grid>
        <InforFarmPageTable />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default InforPage;
