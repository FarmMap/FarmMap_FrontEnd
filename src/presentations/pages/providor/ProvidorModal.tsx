// External imports
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
// Internal imports
import Providor from "../../../data/types/Providor";
import DefaultModal from "../../components/defaultModal";
import FormInput from "../../components/formInput/FormInput";
// Style imports
import classNames from "classnames/bind";
import styles from "./Providor.module.scss";

const cx = classNames.bind(styles);

export interface ProvidorModalProps {
  title: string;
  submitButtonLabel: string;
  providor?: Providor;
  type: { name: string; value: string };
  handleCloseModal: () => void;
  onSubmit: (Providor: Providor) => void;
}

const ProvidorModal = (props: ProvidorModalProps) => {
  const [providor, setProvidor] = useState<Providor>(
    props.providor ?? {
      name: "",
      address: "",
      phoneNumber: "",
      debt: 0,
      description: "",
    }
  );

  return (
    <DefaultModal title={props.title} onClose={props.handleCloseModal}>
      {/* Modal body */}
      <Grid container spacing={3} className={cx("form-body-wrapper")}>
        <FormInput
          label={`Tên ${props.type.name}`}
          placeholder={`Nhập tên ${props.type.name}`}
          type="text"
          required
          value={`${providor.name}`}
          onChange={(event) => {
            let newProvidor: Providor = {
              ...providor,
              name: event.currentTarget.value,
            };
            setProvidor(newProvidor);
          }}
        />

        <FormInput
          label="Địa chỉ"
          placeholder={`Nhập địa chỉ`}
          type="text"
          required
          value={`${providor.address}`}
          onChange={(event) => {
            let newProvidor: Providor = {
              ...providor,
              address: event.currentTarget.value,
            };
            setProvidor(newProvidor);
          }}
        />

        <FormInput
          label="Dư nợ"
          placeholder="Nhập số tiền dư nợ "
          type="text"
          required
          value={`${String(providor.debt ?? "").replace(
            /(.)(?=(\d{3})+$)/g,
            "$1."
          )}`}
          onChange={(event) => {
            let newProvidor: Providor = {
              ...providor,
              debt:
                parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
            };

            setProvidor(newProvidor);
          }}
        />

        <FormInput
          label="Số điện thoại"
          placeholder={`Nhập số điện thoại`}
          type="text"
          required
          value={`${providor.phoneNumber}`}
          onChange={(event) => {
            let newProvidor: Providor = {
              ...providor,
              phoneNumber: event.currentTarget.value,
            };
            setProvidor(newProvidor);
          }}
        />

        <FormInput
          label="Ghi chú"
          placeholder={`Nhập ghi chú`}
          type="text"
          required
          value={`${providor.description}`}
          onChange={(event) => {
            let newProvidor: Providor = {
              ...providor,
              description: event.currentTarget.value,
            };
            setProvidor(newProvidor);
          }}
        />

        <Grid item xs={3}></Grid>
        <Grid item xs={7}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            onClick={() => props.onSubmit(providor)}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default ProvidorModal;
