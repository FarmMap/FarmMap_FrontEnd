// External
import { Delete, Edit, Image } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Internal imports
import { ListIcon } from "../../components/sidebar/SidebarData";
import ImageIcon from "@mui/icons-material/Image";
// Style imports
import classNames from "classnames/bind";
import styles from "./Company.module.scss";
import Farm from "../../../data/types/Farm";
const cx = classNames.bind(styles);

interface CompanyTableProps {
  farms: Farm[];
  handleGetInforFarm: (farm: Farm) => void;
}

const CompanyTable = (props: CompanyTableProps) => {
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
              <th>Tên doanh nghiệp</th>
              <th>Mô hình kinh doanh</th>
              <th>Loại hình kinh doanh</th>
              <th>Tỉnh</th>
              <th>Quận-Huyện</th>
              <th>Phường-Xã</th>
              <th>Địa chỉ</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {props.farms?.map((farm, i) => (
              <tr key={i}>
                <td>
                  <p>{i + 1}</p>
                </td>
                <td>
                  <p>{farm.name}</p>
                </td>
                <td>
                  <p>{farm.business_model}</p>
                </td>
                <td>
                  <p>{farm.business_type}</p>
                </td>
                <td>
                  <p>{farm.province}</p>
                </td>
                <td>
                  <p>{farm.district}</p>
                </td>
                <td>
                  <p>{farm.wards}</p>
                </td>
                <td>
                  <p>{farm.address}</p>
                </td>
                <td
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  <Tippy content={`Xem ảnh farm ${farm.name}`} theme="light">
                    <Button
                      className={cx("btn-image")}
                      variant="contained"
                      onClick={() => props.handleGetInforFarm(farm)}
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

export default CompanyTable;
