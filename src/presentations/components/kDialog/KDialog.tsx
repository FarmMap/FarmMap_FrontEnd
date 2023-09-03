// External imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  styled,
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
  bckColor: string;
}
const StyledButton = styled(Button)<KDialogProps>`
  && {
    font-size: 1.3rem;
    background-color: ${(props) => props.bckColor};
    &:hover {
      background-color: ${(props) => props.bckColor};
      opacity: 0.8;
    }
  }
`;

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
        sx={{
          fontSize: "1.6rem",
          fontWeight: "bold",
          minWidth: "300px",
          color: "var(--white-color)",
          backgroundColor: props.bckColor,
          padding: "10px 20px",
          marginBottom: "12px",
        }}
      >
        {props.title}
      </DialogTitle>
      <DialogContent sx={{ fontSize: "1.4rem" }}>{props.content}</DialogContent>
      <DialogActions>
        <Button sx={{ fontSize: "1.3rem" }} onClick={props.onCancel}>
          Hủy
        </Button>
        <StyledButton
          bckColor={props.bckColor}
          onClick={props.onConfirm}
          variant="contained"
          open={true}
          title="Xác nhận xóa"
          content={<p></p>}
          onCancel={() => {}}
          onConfirm={() => {}}
          disableElevation
        >
          Xác nhận
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default KDialog;
