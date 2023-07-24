// External importsimports
import { Delete, Edit, Image } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import ImageIcon from "@mui/icons-material/Image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Internal imports
import { ListIcon } from "../../../components/sidebar/SidebarData";

// Style imports
import classNames from "classnames/bind";
import styles from "./InforFarmPage.module.scss";
import { Area } from "../../../../data/types/Area";
import { useState } from "react";
const cx = classNames.bind(styles);

interface InforFarmPageTableProps {
  areas: Area[];
  handleGetAvtArea: (area: Area) => void;
  handleSeeLocationArea: (area: Area) => void;
  seeLocation: boolean;
  areaProps?: Area;
}

const InforFarmPageTable = (props: InforFarmPageTableProps) => {
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  const toggleRowVisibility = (index: number) => {
    const newVisibleRows = new Set(visibleRows);
    if (visibleRows.has(index)) {
      newVisibleRows.delete(index);
    } else {
      newVisibleRows.add(index);
    }
    setVisibleRows(newVisibleRows);
  };
  return (
    <Grid>
      {/* on PC */}
      <Grid
        sx={{
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
          },
        }}
      >
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên trang trại</th>
              <th>Tên khu</th>
              <th>Diện tích</th>
              <th>Ghi chú</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {props.areas.map((area, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{area.farm?.name}</td>
                <td>{area.name}</td>
                <td>
                  {area.acreage}m<sup>2</sup>
                </td>
                <td>{area.description}</td>
                <td
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  <Tippy
                    content={
                      !props.seeLocation
                        ? `Xem vị trí ${area.name} (từng vị trí)`
                        : `Ẩn vị trí ${area.name} (từng vị trí)`
                    }
                    theme="light"
                  >
                    <Button
                      className={cx("btn-edit")}
                      variant="contained"
                      onClick={() => props.handleSeeLocationArea(area)}
                      disableElevation={true}
                    >
                      {props.seeLocation &&
                      props.areaProps?.id !== undefined &&
                      props.areaProps?.id === area.id ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Button>
                  </Tippy>

                  <Tippy content={`Xem ảnh ${area.name}`} theme="light">
                    <Button
                      className={cx("btn-image")}
                      variant="contained"
                      onClick={() => props.handleGetAvtArea(area)}
                      disableElevation={true}
                    >
                      <ImageIcon />
                    </Button>
                  </Tippy>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>

      {/* On MB and Tablet */}
      <Grid
        sx={{
          display: {
            lg: "none",
            md: "none",
            sm: "block",
            xs: "block",
          },
        }}
      >
        {/* {props.cars.map((car, index) => ( */}
        <Accordion style={{ marginBottom: "20px" }}>
          <AccordionSummary
            aria-controls={`${1}`}
            id={`${1}`}
            expandIcon={
              <Button
                className={cx("btn-more")}
                variant="contained"
                disableElevation={true}
              >
                <ExpandMoreIcon className={cx("moreIcon")} />
              </Button>
            }
          >
            {/* Content summary */}
            <Grid className={cx("d-flx")}>
              <Typography>
                {/* Username */}
                <Typography
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    fontSize: "1.6rem",
                    width: "100%",
                    marginTop: "4px",
                  }}
                ></Typography>

                {/* Filter */}
                <Typography className={cx("title")}></Typography>

                <Typography className={cx("title")}></Typography>
              </Typography>

              {/* Btn edit delete */}
              <Typography style={{ display: "flex", alignItems: "center" }}>
                <Tippy content={`Cập nhật xe `} theme="light">
                  <Button
                    className={cx("btn-edit")}
                    variant="contained"
                    disableElevation={true}
                  >
                    <Edit />
                  </Button>
                </Tippy>

                {/* Delete btn */}
                <Tippy content={`Xóa xe `} theme="light">
                  <Button
                    className={cx("btn-delete")}
                    variant="contained"
                    disableElevation={true}
                    sx={{
                      marginRight: {
                        lg: "0",
                        md: "0",
                        sm: "8px",
                        xs: "8px ",
                      },
                    }}
                  >
                    <Delete />
                  </Button>
                </Tippy>
              </Typography>
            </Grid>
          </AccordionSummary>

          <AccordionDetails
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            <ul>
              <li className={cx("label-wrapper")}>
                <span className={cx("label-container")}>
                  <ListIcon className={cx("label-icon")} />
                  <span className={cx("label")}>Biển kiểm soát:</span>
                </span>
                <span className={cx("label-content")}></span>
              </li>

              <li className={cx("label-wrapper")}>
                <span className={cx("label-container")}>
                  <ListIcon className={cx("label-icon")} />
                  <span className={cx("label")}>Hãng xe</span>
                </span>
              </li>

              <li className={cx("label-wrapper")}>
                <span className={cx("label-container")}>
                  <ListIcon className={cx("label-icon")} />{" "}
                  <span className={cx("label")}>Màu xe:</span>
                </span>
              </li>

              <li className={cx("label-wrapper")}>
                <span className={cx("label-container")}>
                  <ListIcon className={cx("label-icon")} />
                  <span className={cx("label")}>Số chỗ:</span>
                </span>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
        {/* ))} */}
      </Grid>
    </Grid>
  );
};

export default InforFarmPageTable;
