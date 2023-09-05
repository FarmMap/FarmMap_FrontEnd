import React, { useEffect, useState } from "react";
// Ex
import { Grid, Pagination } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import VisitorTable from "./VisitorTable";

import { toast } from "react-toastify";
import KDialog from "../../components/kDialog/KDialog";

import Visitor from "../../../data/types/Visitor";

import useCreateVisitor from "../../../api/Visitor/useCreateVisitor";
import useUpdateVisitor from "../../../api/Visitor/useUpdateVisitor";
import useFetchVisitor from "../../../api/Visitor/useFetchVisitor";
import useDeleteVisitor from "../../../api/Visitor/useDeleteVisitor";
import VisitorModal from "./VisitorModal";
// Style imports

const VisitorPage = () => {
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Get visitors
  const {
    visitors,
    error: fetchVisitorErr,
    pages,
    isLoading,
  } = useFetchVisitor({
    shouldRefesh: refresh,
    page: page,
    query: query,
  });
  // Create farm
  const {
    isCreated,
    createVisitor,
    error: createVisitorErr,
  } = useCreateVisitor();

  const handleCreateVisitor = (visitor: Visitor) => {
    createVisitor({ visitor: visitor });
  };

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };
  const handleSearchSubmit = (query: string) => setQuery(query);

  // Delete
  const {
    deleteVisitor,
    isDeleted,
    error: deleteVisitorErr,
  } = useDeleteVisitor();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    visitor: undefined | Visitor;
  }>({ open: false, visitor: undefined });

  // Delete customer when submit
  const handleDeleteVisitorButton = (visitor: Visitor) => {
    setShowConfirmDeleteModal({ open: true, visitor: visitor });
  };

  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, visitor: undefined });
  };

  const handleConfirmDelete = () => {
    deleteVisitor({
      visitor: showConfirmDeleteModal.visitor as Visitor,
    });
    setShowConfirmDeleteModal({ open: false, visitor: undefined });
  };

  // Update
  const {
    isUpdated,
    error: updateVisitorErr,
    updateVisitor,
  } = useUpdateVisitor();
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    visitor: undefined | Visitor;
  }>({ open: false, visitor: undefined });

  const handleEditVisitor = (visitor: Visitor) => {
    setShowUpdateModal({ open: true, visitor: visitor });
  };

  const handleUpdateVisitor = (visitor: Visitor) => {
    updateVisitor({ visitor: visitor });
  };

  useEffect(() => {
    let error =
      createVisitorErr ??
      fetchVisitorErr ??
      deleteVisitorErr ??
      updateVisitorErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted || isUpdated) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setShowModal(false);
    }
  }, [
    createVisitorErr,
    deleteVisitorErr,
    fetchVisitorErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateVisitorErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="khách tham quan"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên khách tham quan",
                searchPlaceholder: "Nhập tên...",
                query: query,
                setQuery: setQuery,
              },
            ]}
            onSearchSubmit={handleSearchSubmit}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <VisitorTable
          visitors={visitors}
          handleDeleteVisitor={handleDeleteVisitorButton}
          handleEditVisitor={handleEditVisitor}
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
          <VisitorModal
            title={`Thêm mới khách tham quan`}
            handleCloseModal={() => {
              setShowModal(false);
            }}
            submitButtonLabel="Xác nhận"
            visitor={!isCreated ? undefined : {}}
            onSubmit={handleCreateVisitor}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <VisitorModal
            title="Cập nhật khách tham quan"
            handleCloseModal={() =>
              setShowUpdateModal({ open: false, visitor: undefined })
            }
            submitButtonLabel="Xác nhận"
            visitor={showUpdateModal.visitor}
            onSubmit={handleUpdateVisitor}
          />
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          bckColor="var(--second-color)"
          title="Xác nhận xóa"
          content={
            <p>
              Khách tham quan {""}
              <span>{showConfirmDeleteModal.visitor?.name}</span> sẽ bị xóa khỏi
              hệ thống. <br />
              Bạn có muốn xóa khách tham quan này không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default VisitorPage;
