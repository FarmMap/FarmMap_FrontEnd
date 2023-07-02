// External
import React, { Fragment, useState } from "react";
import DefaultWebLayOut from "../../../components/defaultWebLayOut/DefaultWebLayOut";
import { Grid, MenuItem, Select } from "@mui/material";
import FormInput from "../../../components/formInput/FormInput";
import DefaultTitleLayOut from "../../../components/defaultTitleLayOut/DefaultTitleLayOut";
import DefaultFilterLayOut from "../../../components/defaultTitleLayOut/DefaultFilterLayOut";
// Internal
// Style imports
import classNames from "classnames/bind";
import styles from "./Area.module.scss";
import AreaTable from "./AreaTable";
import AreaModal from "./AreaModal";
import PlaneArea from "../../../../data/types/PlaneArea";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

const AreaPage = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Vùng trồng"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên vùng trồng",
                searchPlaceholder: "Nhập tên vùng trồng",
                query: query,
                setQuery: setQuery,
              },
            ]}
            filters={[
              <Fragment>
                <label htmlFor="select">Tỉnh</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={""}
                  displayEmpty
                  onChange={() => {}}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
              <Fragment>
                <label htmlFor="select">Quận-Huyện</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={"Hi"}
                  displayEmpty
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <AreaTable />

        {showModal && (
          <AreaModal
            title="Thêm khu đất"
            submitButtonLabel="Xác nhận"
            handleCloseModal={() => setShowModal(false)}
          />
        )}
      </Grid>
    </DefaultWebLayOut>
  );
};

export default AreaPage;
