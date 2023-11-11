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
import Visitor from "../../../data/types/Visitor";

// Style imports
import classNames from "classnames/bind";
import styles from "./Visitor.module.scss";
import { STATUSVISITOR } from "../../../constants/Constants";
import { toReadableDate } from "../../../utils/Utils";
const cx = classNames.bind(styles);

interface VisitorTableProps {
  visitors: Visitor[];
  handleDeleteVisitor: (visitor: Visitor) => void;
  handleEditVisitor: (visitor: Visitor) => void;
}

const VisitorTable = (props: VisitorTableProps) => {
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
              <th>Tên khách</th>
              <th>Số lượng</th>
              <th>Ngày tiếp đón</th>
              <th>Trạng thái</th>
              <th>Ghi chú</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {props.visitors.map((visitor, i) => (
              <tr key={i}>
                <td>
                  <p>{i + 1}</p>
                </td>
                <td>
                  <p>{visitor.name}</p>
                </td>
                <td>
                  <p>{visitor.quantity}</p>
                </td>
                <td>
                  <p>{toReadableDate(visitor.receptionDay ?? "")}</p>
                </td>
                <td>
                  {STATUSVISITOR.map((item, i) => (
                    <p key={i}>{item.value == visitor.status && item.name}</p>
                  ))}
                </td>

                <td>
                  <p>{visitor.description}</p>
                </td>

                <td
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  <Tippy
                    content={`Sửa thông tin phiếu yêu cầu ${visitor.name}`}
                    theme="light"
                  >
                    <Button
                      className={cx("btn-edit")}
                      variant="contained"
                      onClick={() => {
                        props.handleEditVisitor(visitor);
                      }}
                      disableElevation={true}
                    >
                      <Edit />
                    </Button>
                  </Tippy>

                  <Tippy
                    content={`Xóa phiếu yêu cầu ${visitor.name}`}
                    theme="light"
                  >
                    <Button
                      className={cx("btn-delete")}
                      variant="contained"
                      disableElevation={true}
                      onClick={() => {
                        props.handleDeleteVisitor(visitor);
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

export default VisitorTable;
