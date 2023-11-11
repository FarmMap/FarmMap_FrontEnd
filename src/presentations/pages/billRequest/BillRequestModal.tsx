// External imports
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
// Internal imports
import BillRequest from "../../../data/types/BillRequest";
import DefaultModal from "../../components/defaultModal";
import FormInput from "../../components/formInput/FormInput";
// Style imports
import classNames from "classnames/bind";
import styles from "./BillRequest.module.scss";
import FormDropdown, {
  DropdownOption,
} from "../../components/formDropDown/FormDropdown";
import { STATUSBILL } from "../../../constants/Constants";
import useFetchMaterials from "../../../api/Material/useFetchMaterials";
import useFetchProvidor from "../../../api/Providor/useFetchProvidorList";

const cx = classNames.bind(styles);

export interface BillRequestModalProps {
  title: string;
  submitButtonLabel: string;
  billRequest?: BillRequest;
  handleCloseModal: () => void;
  onSubmit: (billRequest: BillRequest) => void;
}

const BillRequestModal = (props: BillRequestModalProps) => {
  const [billRequest, setBillRequest] = useState<BillRequest>(
    props.billRequest ?? {}
  );

  const { materials } = useFetchMaterials({ page: 1 });

  const { providors } = useFetchProvidor({ page: 1, query: "" });

  return (
    <DefaultModal title={props.title} onClose={props.handleCloseModal}>
      {/* Modal body */}
      <Grid container spacing={3} className={cx("form-body-wrapper")}>
        <FormInput
          label={`Tên phiếu yêu cầu`}
          placeholder={`Nhập tên...`}
          type="text"
          required
          value={`${billRequest.name ?? ""}`}
          onChange={(event) => {
            let newBillRequest: BillRequest = {
              ...billRequest,
              name: event.currentTarget.value,
            };
            setBillRequest(newBillRequest);
          }}
        />

        <FormInput
          label="Số lượng"
          placeholder="Nhập số lượng "
          type="text"
          required
          value={`${String(billRequest.quantity ?? "").replace(
            /(.)(?=(\d{3})+$)/g,
            "$1."
          )}`}
          onChange={(event) => {
            let newBillRequest: BillRequest = {
              ...billRequest,
              quantity:
                parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
            };

            setBillRequest(newBillRequest);
          }}
        />

        <FormDropdown
          label="Trạng thái"
          value={billRequest.status ?? ""}
          required
          options={STATUSBILL.map((u) => {
            return {
              name: u.name,
              value: u.value,
            } as DropdownOption;
          })}
          onChange={(event) => {
            let newBillRequest: BillRequest = {
              ...billRequest,
              status: parseInt(event.target.value),
            };
            setBillRequest(newBillRequest);
          }}
        />

        <FormDropdown
          label="Vật tư"
          value={billRequest.materialId ?? ""}
          required
          options={materials.map((u) => {
            return {
              name: u.name,
              value: u.id,
            } as DropdownOption;
          })}
          onChange={(event) => {
            let newBillRequest: BillRequest = {
              ...billRequest,
              materialId: event.target.value,
            };
            setBillRequest(newBillRequest);
          }}
        />

        <FormDropdown
          label="Nhà cung cấp"
          value={billRequest.providerId ?? billRequest.provider?.name}
          required
          options={providors.map((u) => {
            return {
              name: u.name,
              value: u.id,
            } as DropdownOption;
          })}
          onChange={(event) => {
            let newBillRequest: BillRequest = {
              ...billRequest,
              providerId: event.target.value,
            };
            setBillRequest(newBillRequest);
          }}
        />

        <FormInput
          label="Ghi chú"
          placeholder={`Nhập ghi chú`}
          type="text"
          required
          value={`${billRequest.description ?? ""}`}
          onChange={(event) => {
            let newBillRequest: BillRequest = {
              ...billRequest,
              description: event.currentTarget.value,
            };
            setBillRequest(newBillRequest);
          }}
        />

        <Grid item xs={3}></Grid>
        <Grid item xs={7}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => props.onSubmit(billRequest)}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default BillRequestModal;
