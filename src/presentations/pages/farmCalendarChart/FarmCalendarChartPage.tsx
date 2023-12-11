import React from "react";
// Ex
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";

// Style imports
import classNames from "classnames/bind";
import styles from "./FarmCalendarChart.module.scss";
import FarmCalendarChart from "../../components/chart/farmCalendarChart/farmCalendarChart/FarmCalendarChart";

const cx = classNames.bind(styles);

const FarmCalendarChartPage = () => {
  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Lịch canh tác"
          handleAddButtonClick={() => {}}
          btnElement={
            <Button
              onClick={() => {
                window.location.href = "/nong-trai/lich-canh-tac";
              }}
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
            >
              Thêm mới
            </Button>
          }
        >
          <Grid height={"100vh"}>
            <FarmCalendarChart />
          </Grid>
        </DefaultTitleLayOut>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default FarmCalendarChartPage;
