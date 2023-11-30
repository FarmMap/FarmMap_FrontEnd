// External
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

// Internal

// Styles
import classNames from "classnames/bind";
import styles from "./DefaultModal.module.scss";
import React from "react";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
const cx = classNames.bind(styles);

interface DefaultModalProps {
  children: JSX.Element;
  title: string | JSX.Element;
  overrideMaxWidth?: SystemStyleObject<Theme>;
  onClose: () => void;
}

const DefaultModal: React.FC<DefaultModalProps> = (props) => {
  return (
    <Grid className={cx("wrapper")} onClick={() => props.onClose()}>
      <Grid
        onClick={(e) => e.stopPropagation()}
        sx={{
          maxWidth: props.overrideMaxWidth ?? {
            lg: "800px",
            md: "800px",
            sm: "500px",
            xs: "auto",
          },
          margin: {
            lg: "21px auto",
            md: "21px auto",
            sm: "21px auto",
            xs: "6px",
          },
        }}
        className={cx("modal-dialog")}
      >
        <div className={cx("modal-content")}>
          {/* header */}
          <div className={cx("header")}>
            <span>{props.title}</span>
            <Button variant="text" onClick={() => props.onClose()}>
              <CloseIcon className={cx("close-icon")} />
            </Button>
          </div>
          <div className={cx("modal-body")}>{props.children}</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default DefaultModal;
