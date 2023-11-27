// External files

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { ReactElement, useEffect, useState } from "react";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import classNames from "classnames/bind";
import styles from "./DefaultTitleLayOut.module.scss";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import Grid from "@mui/material/Grid";

// Internal files

// Styles

const cx = classNames.bind(styles);

interface DefaultManagerLayOutProps {
  heading: string;
  children: ReactElement;
  btnElement?: ReactElement;
  handleAddButtonClick: () => void;
  showHeading?: boolean;
}

const DefaultTitleLayOut: React.FC<DefaultManagerLayOutProps> = (props) => {
  const [checkCooperator, setCheckCooperator] = useState(false);

  useEffect(() => {
    if (
      window.location.href.indexOf("lich-canh-tac/thong-ke") !== -1 ||
      window.location.href.indexOf("nong-trai/lich-canh-tac") !== -1
    ) {
      setCheckCooperator(true);
    } else {
      setCheckCooperator(false);
    }
  }, [checkCooperator]);

  return (
    <div className={cx("wrapper")}>
      {/* Header */}
      {!props.showHeading && (
        <Grid
          className={cx("header")}
          item
          sx={{
            paddingBottom: {
              lg: "12px",
              md: "12px",
              sm: "20px",
              xs: "20px",
            },
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            },
          }}
        >
          <div className={cx("heading-wrapper")}>
            <SignalCellularAltIcon className={cx("heading-wrapper-icon")} />
            <span className={cx("heading-title")}>{props.heading}</span>
          </div>

          <div className={cx("add-btn-wrapper")}>
            {!checkCooperator ? (
              <Button
                onClick={() => props.handleAddButtonClick()}
                variant="contained"
                startIcon={<AddIcon className={cx("add-icon")} />}
                size="large"
              >
                Thêm mới
              </Button>
            ) : (
              props.btnElement
            )}
          </div>
        </Grid>
      )}

      {/* body */}
      {props.children}
    </div>
  );
};

export default DefaultTitleLayOut;
