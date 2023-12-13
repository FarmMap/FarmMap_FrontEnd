import React,{useState,Fragment} from 'react'
import DefaultWebLayOut from '../../components/defaultWebLayOut';
import { Grid, Select,MenuItem } from '@mui/material';
import DefaultTitleLayOut from '../../components/defaultTitleLayOut';
import { Button } from "antd";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DefaultFilterLayOut from '../../components/defaultTitleLayOut/DefaultFilterLayOut';
import FarmDocumentBox from "./FarmDocumentBox"

// Style imports
import classNames from "classnames/bind";
import styles from "./FarmDocument.module.scss";

const cx = classNames.bind(styles);


const FarmDocumentPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState("");
  return (
    <DefaultWebLayOut>
        <Grid>
        <DefaultTitleLayOut 
          heading="Tài liệu"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
          btnElement={
            <Fragment>
              
              <Button
                type="primary"
                size={"large"}
                onClick={() => setShowModal(true)}
              >
                <AddIcon style={{ height: "24px" }} />
              </Button>
            </Fragment>
          }
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên tài liệu",
                searchPlaceholder: "Nhập tên tài liệu",
                query: query,
                setQuery: setQuery,
              },
            ]}
            filters={[
              <Fragment>
                <label htmlFor="select">Lĩnh vực</label>
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
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>
        <FarmDocumentBox/>
        
        </Grid>
    </DefaultWebLayOut>
  )
}

export default FarmDocumentPage