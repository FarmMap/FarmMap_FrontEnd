// External
import { Delete, Edit } from "@mui/icons-material";
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
import { toReadableDate } from "../../../utils/Utils";
import Providor from "../../../data/types/Providor";

// Style imports
import classNames from "classnames/bind";
import styles from "./Providor.module.scss";
const cx = classNames.bind(styles);

interface ProvidorTableProps {
  providors: Providor[];
  handleDeleteProvidor: (Providor: Providor) => void;
  handleEditProvidor: (Providor: Providor) => void;
}

const ProvidorTable = (props: ProvidorTableProps) => {
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
              <th>Họ và tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Dư nợ</th>
              <th>Ghi chú</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {props.providors.map((providor, i) => (
              <tr key={i}>
                <td>
                  <p>{i + 1}</p>
                </td>
                <td>
                  <p>{providor.name}</p>
                </td>
                <td>
                  <p>{providor.address}</p>
                </td>
                <td>
                  <Tippy content={`gọi ${providor.phoneNumber}`} theme="light">
                    <a href={`tel: ${providor.phoneNumber}`}>
                      {providor.phoneNumber?.replace(/[^\d]/g, "").slice(0, 3)}{" "}
                      {providor.phoneNumber?.replace(/[^\d]/g, "").slice(3, 6)}{" "}
                      {providor.phoneNumber?.replace(/[^\d]/g, "").slice(6, 10)}
                    </a>
                  </Tippy>
                </td>

                <td>
                  <p>
                    {`${
                      providor.debt !== null && providor.debt !== undefined
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(providor.debt)
                        : ""
                    }`}
                  </p>
                </td>
                <td>
                  <p>{providor.description}</p>
                </td>

                <td
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  <Tippy
                    content={`Sửa thông tin nhà cung cấp ${providor.name}`}
                    theme="light"
                  >
                    <Button
                      className={cx("btn-edit")}
                      variant="contained"
                      onClick={() => {
                        props.handleEditProvidor(providor);
                      }}
                      disableElevation={true}
                    >
                      <Edit />
                    </Button>
                  </Tippy>

                  <Tippy
                    content={`Xóa nhà cung cấp ${providor.name}`}
                    theme="light"
                  >
                    <Button
                      className={cx("btn-delete")}
                      variant="contained"
                      disableElevation={true}
                      onClick={() => {
                        props.handleDeleteProvidor(providor);
                      }}
                    >
                      <Delete />
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

export default ProvidorTable;
