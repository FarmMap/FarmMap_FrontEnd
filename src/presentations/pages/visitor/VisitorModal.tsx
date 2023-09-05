// External imports
import { Button, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
// Internal imports
import DefaultModal from "../../components/defaultModal";
import FormInput from "../../components/formInput/FormInput";
import FormDropdown, {
  DropdownOption,
} from "../../components/formDropDown/FormDropdown";
import { STATUSVISITOR } from "../../../constants/Constants";

// Style imports
import classNames from "classnames/bind";
import styles from "./Visitor.module.scss";
import Visitor from "../../../data/types/Visitor";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

const cx = classNames.bind(styles);

export interface VisitorModalProps {
  title: string;
  submitButtonLabel: string;
  visitor?: Visitor;
  handleCloseModal: () => void;
  onSubmit: (visitor: Visitor) => void;
}

const VisitorModal = (props: VisitorModalProps) => {
  const [visitor, setVisitor] = useState<Visitor>(
    props.visitor ?? {
      status: 4,
    }
  );

  return (
    <DefaultModal title={props.title} onClose={props.handleCloseModal}>
      {/* Modal body */}
      <Grid container spacing={3} className={cx("form-body-wrapper")}>
        <FormInput
          label={`Tên khách tham quan`}
          placeholder={`Nhập tên...`}
          type="text"
          required
          value={`${visitor.name ?? ""}`}
          onChange={(event) => {
            let newvisitor: Visitor = {
              ...visitor,
              name: event.currentTarget.value,
            };
            setVisitor(newvisitor);
          }}
        />

        <FormInput
          label="Số lượng"
          placeholder="Nhập số lượng "
          type="text"
          required
          value={`${String(visitor.quantity ?? "").replace(
            /(.)(?=(\d{3})+$)/g,
            "$1."
          )}`}
          onChange={(event) => {
            let newvisitor: Visitor = {
              ...visitor,
              quantity:
                parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
            };

            setVisitor(newvisitor);
          }}
        />

        {props.visitor !== undefined && (
          <FormDropdown
            label="Trạng thái"
            value={visitor.status ?? ""}
            required
            options={STATUSVISITOR.map((u) => {
              return {
                name: u.name,
                value: u.value,
              } as DropdownOption;
            })}
            onChange={(event) => {
              let newvisitor: Visitor = {
                ...visitor,
                status: parseInt(event.target.value),
              };
              setVisitor(newvisitor);
            }}
          />
        )}

        <Fragment>
          <Grid
            item
            lg={3}
            md={4}
            sm={4}
            xs={12}
            className={cx("form-control-wrapper")}
          >
            <label className={cx("form-input-label")} htmlFor={"Dientich"}>
              Ngày tiếp đón<span style={{ color: "red" }}>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7}
            md={7}
            sm={7}
            xs={12}
            className={cx("form-control-wrapper")}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Ngày tiếp đón"
                  value={dayjs(visitor.receptionDay)}
                  onChange={(date: Dayjs | null) => {
                    // Convert the selected Dayjs date to an ISO string and update the state
                    setVisitor({
                      ...visitor,
                      receptionDay: date?.toISOString() ?? "",
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Fragment>

        <FormInput
          label="Ghi chú"
          placeholder={`Nhập ghi chú`}
          type="text"
          required
          value={`${visitor.description ?? ""}`}
          onChange={(event) => {
            let newvisitor: Visitor = {
              ...visitor,
              description: event.currentTarget.value,
            };
            setVisitor(newvisitor);
          }}
        />

        <Grid item xs={3}></Grid>
        <Grid item xs={7}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => props.onSubmit(visitor)}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default VisitorModal;
