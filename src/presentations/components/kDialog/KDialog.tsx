// External imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Style imports
import classNames from "classnames/bind";
import styles from "./KDialog.module.scss";
const cx = classNames.bind(styles);

interface KDialogProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

const KDialog = (props: KDialogProps) => {
  return (
    <Dialog
      className={cx("dialog")}
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ zIndex: 9999999, minWidth: "200px" }}
    >
      <DialogTitle
        sx={{ fontSize: "1.6rem", fontWeight: "bold", minWidth: "300px" }}
      >
        {props.title}
      </DialogTitle>
      <DialogContent sx={{ fontSize: "1.4rem" }}>{props.content}</DialogContent>
      <DialogActions>
        <Button sx={{ fontSize: "1.3rem" }} onClick={props.onCancel}>
          Hủy
        </Button>
        <Button
          variant="contained"
          sx={{ fontSize: "1.3rem" }}
          disableElevation={true}
          autoFocus
          onClick={props.onConfirm}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KDialog;
