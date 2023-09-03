import React, { Fragment, useEffect, useState } from "react";
// Ex
import {
  Button,
  Grid,
  Link,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import FarmCalendarTable from "./BillRequestTable";

import { toast } from "react-toastify";
import KDialog from "../../components/kDialog/KDialog";

import BillRequest from "../../../data/types/BillRequest";
import { TYPEPERSON } from "../../../constants/Constants";
import BillRequestModal from "./BillRequestModal";
import useCreatebillRequest from "../../../api/BillRequest/useCreateBillRequest";
import useFetchBillRequest from "../../../api/BillRequest/useFetchBillRequest";
import useDeleteBillRequest from "../../../api/BillRequest/useDeleteBillRequest";
// Style imports
import classNames from "classnames/bind";
import styles from "./BillRequest.module.scss";
import useCreateBillRequest from "../../../api/BillRequest/useCreateBillRequest";
import useUpdateBillRequest from "../../../api/BillRequest/useUpdateBillRequest";

const cx = classNames.bind(styles);

const BillRequestPage = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<{ name: string; value: string }>({
    name: "",
    value: "",
  });
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);

  const handleTypeClick = (index: number) => {
    setSelectedType(index);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setRefresh((refresh) => !refresh);
  };

  useEffect(() => {
    if (selectedType !== null) {
      const selectedTypeValue = TYPEPERSON[selectedType].value;
      const selectedTypeName = TYPEPERSON[selectedType].name;
      setType({ name: selectedTypeName, value: selectedTypeValue });
    }
  }, [selectedType]);

  // Get billRequests
  const {
    billRequests,
    error: fetchbillRequestErr,
    pages,
    isLoading,
  } = useFetchBillRequest({
    shouldRefesh: refresh,
    page: page,
    query: query,
  });
  // Create farm
  const {
    isCreated,
    createBillRequest,
    error: createBillRequestErr,
  } = useCreateBillRequest();

  const handleCreateBillRequest = (billRequest: BillRequest) => {
    createBillRequest({ billRequest: billRequest });
  };

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };
  const handleSearchSubmit = (query: string) => setQuery(query);

  // Delete
  const {
    deleteBillRequest,
    isDeleted,
    error: deleteBillRequestErr,
  } = useDeleteBillRequest();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    billRequest: undefined | BillRequest;
  }>({ open: false, billRequest: undefined });

  // Cancel Delete close modal, employee = undefined
  const handleCancelPickType = () => {
    setShowTypeModal(false);
    setType({ name: "", value: "" });
    setSelectedType(null);
  };

  const handleConfirmPickType = () => {
    setShowTypeModal(false);
    setShowModal(true);
  };

  // Delete customer when submit
  const handleDeleteBillRequestButton = (billRequest: BillRequest) => {
    setShowConfirmDeleteModal({ open: true, billRequest: billRequest });
  };

  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, billRequest: undefined });
  };

  const handleConfirmDelete = () => {
    deleteBillRequest({
      billRequest: showConfirmDeleteModal.billRequest as BillRequest,
    });
    setShowConfirmDeleteModal({ open: false, billRequest: undefined });
  };

  // Update
  const {
    isUpdated,
    error: updateBillRequestErr,
    updateBillRequest,
  } = useUpdateBillRequest();
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    billRequest: undefined | BillRequest;
  }>({ open: false, billRequest: undefined });

  const handleEditbillRequest = (billRequest: BillRequest) => {
    setShowUpdateModal({ open: true, billRequest: billRequest });
  };

  const handleUpdateBillRequest = (billRequest: BillRequest) => {
    updateBillRequest({ billRequest: billRequest });
  };

  useEffect(() => {
    let error =
      createBillRequestErr ??
      fetchbillRequestErr ??
      deleteBillRequestErr ??
      updateBillRequestErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted || isUpdated) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setShowModal(false);
        setType({ name: "", value: "" });
        setSelectedType(null);
      }, 3000);
    }
  }, [
    createBillRequestErr,
    deleteBillRequestErr,
    fetchbillRequestErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateBillRequestErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="phiếu yêu cầu"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên phiếu yêu cầu",
                searchPlaceholder: "Nhập tên...",
                query: query,
                setQuery: setQuery,
              },
            ]}
            onSearchSubmit={handleSearchSubmit}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <FarmCalendarTable
          billRequests={billRequests}
          handleDeleteBillRequest={handleDeleteBillRequestButton}
          handleEditBillRequest={handleEditbillRequest}
        />

        {!isLoading && (
          <Pagination
            count={pages}
            page={page}
            defaultPage={1}
            variant="outlined"
            color="primary"
            shape="rounded"
            onChange={handlePaginationChange}
            sx={{
              marginTop: {
                lg: "0",
                md: "0",
                sm: "30px",
                xs: "30px",
              },
            }}
          />
        )}

        {/* Create modal */}
        {showModal && (
          <BillRequestModal
            title={`Thêm mới phiếu yêu cầu`}
            handleCloseModal={() => {
              setShowModal(false);
            }}
            submitButtonLabel="Xác nhận"
            billRequest={!isCreated ? undefined : {}}
            onSubmit={handleCreateBillRequest}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <BillRequestModal
            title="Cập nhật phiếu yêu cầu"
            handleCloseModal={() =>
              setShowUpdateModal({ open: false, billRequest: undefined })
            }
            submitButtonLabel="Xác nhận"
            billRequest={showUpdateModal.billRequest}
            onSubmit={handleUpdateBillRequest}
          />
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          bckColor="var(--second-color)"
          title="Xác nhận xóa"
          content={
            <p>
              Phiếu yêu cầu {""}
              <span>{showConfirmDeleteModal.billRequest?.name}</span> sẽ bị xóa
              khỏi hệ thống. <br />
              Bạn có muốn xóa phiếu yêu cầu này không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default BillRequestPage;
