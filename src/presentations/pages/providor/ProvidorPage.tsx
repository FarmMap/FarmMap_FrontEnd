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
import FarmCalendarTable from "./ProvidorTable";

import { toast } from "react-toastify";
import KDialog from "../../components/kDialog/KDialog";

import useFetchProvidor from "../../../api/Providor/useFetchProvidorList";
import Providor from "../../../data/types/Providor";
import { TYPEPERSON } from "../../../constants/Constants";
import ProvidorModal from "./ProvidorModal";
import useCreateProvidor from "../../../api/Providor/useCreateProvidor";
import useDeleteProvidor from "../../../api/Providor/useDeleteProvidor";
import useUpdateProvidor from "../../../api/Providor/useUpdateProvidor";

// Style imports
import classNames from "classnames/bind";
import styles from "./Providor.module.scss";

const cx = classNames.bind(styles);

const ProvidorPage = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<{ name: string; value: string }>({
    name: "",
    value: "",
  });
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);

  const handleTypeClick = (index: number) => {
    setSelectedType(index);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
    setRefresh((refresh) => !refresh);
  };

  useEffect(() => {
    if (selectedType !== null) {
      const selectedTypeValue = TYPEPERSON[selectedType].value;
      const selectedTypeName = TYPEPERSON[selectedType].name;
      setType({ name: selectedTypeName, value: selectedTypeValue });
    }
  }, [selectedType]);

  // Get farmcalendars
  const {
    providors,
    error: fetchProvidorErr,
    pages,
    isLoading,
  } = useFetchProvidor({
    shouldRefesh: refresh,
    filter: filter,
    page: page,
    query: query,
  });
  // Create farm
  const {
    isCreated,
    createProvidor,
    error: createProvidorErr,
  } = useCreateProvidor({
    type: type.value,
  });

  const handleCreateProvidor = (providor: Providor) => {
    createProvidor({ providor: providor });
  };

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };
  const handleSearchSubmit = (query: string) => setQuery(query);

  // Delete
  const {
    deleteProvidor,
    isDeleted,
    error: deleteProvidorErr,
  } = useDeleteProvidor();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    providor: undefined | Providor;
  }>({ open: false, providor: undefined });

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
  const handleDeleteProvidorButton = (providor: Providor) => {
    setShowConfirmDeleteModal({ open: true, providor: providor });
  };

  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, providor: undefined });
  };

  const handleConfirmDelete = () => {
    deleteProvidor({
      providor: showConfirmDeleteModal.providor as Providor,
    });
    setShowConfirmDeleteModal({ open: false, providor: undefined });
  };

  // Update
  const {
    isUpdated,
    error: updateProvidorErr,
    updateProvidor,
  } = useUpdateProvidor();
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    providor: undefined | Providor;
  }>({ open: false, providor: undefined });

  const handleEditProvidor = (providor: Providor) => {
    setShowUpdateModal({ open: true, providor: providor });
  };

  const handleUpdateFarmCalendar = (providor: Providor) => {
    updateProvidor({ providor: providor });
  };

  useEffect(() => {
    let error =
      createProvidorErr ??
      fetchProvidorErr ??
      deleteProvidorErr ??
      updateProvidorErr;

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
    createProvidorErr,
    deleteProvidorErr,
    fetchProvidorErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateProvidorErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Nhà cung cấp"
          handleAddButtonClick={() => {
            setShowTypeModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Họ và tên",
                searchPlaceholder: "Nhập tên...",
                query: query,
                setQuery: setQuery,
              },
            ]}
            filters={[
              <Grid
                sx={{
                  marginLeft: {
                    lg: "8px",
                    md: "8px",
                    sm: "0",
                    xs: "0",
                  },
                }}
              >
                <label htmlFor="select">Nhóm khách hàng</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{ fontSize: "1.2rem", boxShadow: "none" }}
                  value={`${filter}`}
                  displayEmpty
                  onChange={handleFilterChange}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                  {TYPEPERSON.map((group, index) => (
                    <MenuItem
                      key={index}
                      sx={{ fontSize: "1.2rem" }}
                      value={group.value}
                    >
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>,
            ]}
            onSearchSubmit={handleSearchSubmit}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <FarmCalendarTable
          providors={providors}
          handleDeleteProvidor={handleDeleteProvidorButton}
          handleEditProvidor={handleEditProvidor}
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

        {/* Confirm create modal */}
        <KDialog
          open={showTypeModal}
          title="Chọn loại"
          bckColor="var(--green-color)"
          content={
            <Grid className={cx("type-wrapper")}>
              {TYPEPERSON.map((type, i) => (
                <Button
                  variant="contained"
                  key={i}
                  style={{
                    backgroundColor:
                      selectedType === i
                        ? "var(--green-color)"
                        : "var(--white-color)", // Set red background for selectedType
                    color:
                      selectedType === i
                        ? "var(--white-color)"
                        : "var(--green-color)", // Set red background for selectedType
                  }}
                  onClick={() => handleTypeClick(i)}
                >
                  {type.icon}
                  <p>{type.name}</p>
                </Button>
              ))}
            </Grid>
          }
          onCancel={handleCancelPickType}
          onConfirm={handleConfirmPickType}
        />

        {/* Create modal */}
        {showModal && (
          <ProvidorModal
            title={`Thêm mới ${type.name}`}
            handleCloseModal={() => {
              setShowModal(false);
              setType({ name: "", value: "" });
              setSelectedType(null);
            }}
            submitButtonLabel="Xác nhận"
            providor={!isCreated ? undefined : {}}
            type={type}
            onSubmit={handleCreateProvidor}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <ProvidorModal
            title="Cập nhật nhà cung cấp"
            handleCloseModal={() =>
              setShowUpdateModal({ open: false, providor: undefined })
            }
            submitButtonLabel="Xác nhận"
            providor={showUpdateModal.providor}
            type={type}
            onSubmit={handleUpdateFarmCalendar}
          />
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          bckColor="var(--second-color)"
          title="Xác nhận xóa"
          content={
            <p>
              Nhà cung cấp {""}
              <span>{showConfirmDeleteModal.providor?.name}</span> sẽ bị xóa
              khỏi hệ thống. <br />
              Bạn có muốn xóa nhà cung cấp này không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default ProvidorPage;
