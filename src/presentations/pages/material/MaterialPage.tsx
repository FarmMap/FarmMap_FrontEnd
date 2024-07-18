import React, { Fragment, useEffect, useState } from "react";
// Ex
import { Grid, MenuItem, Pagination, Select } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import FarmCalendarTable from "./MaterialTable";
import Material from "../../../data/types/Material";
import { toast } from "react-toastify";
import DefaultModal from "../../components/defaultModal";
import Carousel from "react-material-ui-carousel";
import useCreateMaterial from "../../../api/Material/useCreateMaterial";
import Province from "../../../data/types/Province";
import MaterialModal from "./MaterialModal";
// Style imports
import classNames from "classnames/bind";
import styles from "./Material.module.scss";
import useFetchMaterials from "../../../api/Material/useFetchMaterials";
import KDialog from "../../components/kDialog/KDialog";
import useDeleteMaterial from "../../../api/Material/useDeleteMaterial";
import useUpdateMaterial from "../../../api/Material/useUpdateMaterial";

const cx = classNames.bind(styles);

const MaterialPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [material, setMaterials] = useState<Material>({
    name: "",
    quantity: 0,
    description: "",
    images: [],
    materialGroupId: "",
  });

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };

  //
  // Get materials
  const {
    materials,
    error: fetchmaterialsErr,
    isLoading,
    pages,
  } = useFetchMaterials({
    shouldRefesh: refresh,
    page: page,
    query: query,
  });

  // Create materials
  const [crop, setCrop] = useState<Province>({
    name: "",
  });
  const {
    isCreated,
    error: creatematerialErr,
    createMaterial,
  } = useCreateMaterial({
    name: material.name,
    quantity: material.quantity,
    description: material.description,
    images: material.images,
    materialGroupId: material.materialGroupId,
  });
  const handleCreateMaterial = (material: Material | undefined) => {
    createMaterial({ material: material });
  };
  // Get img
  const [imgMaterial, setImgMaterial] = useState<{
    open: boolean;
    material?: Material;
  }>({ open: false });

  const handleGetImgMaterial = (material: Material) => {
    setImgMaterial({ open: true, material: material });
  };

  // Delete
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    material: undefined | Material;
  }>({ open: false, material: undefined });

  const {
    deleteMaterial,
    error: deleteMaterialErr,
    isDeleted,
  } = useDeleteMaterial();

  const handleDeleteMaterial = (material: Material) => {
    setShowConfirmDeleteModal({ open: true, material: material });
  };

  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, material: undefined });
  };

  const handleConfirmDelete = () => {
    deleteMaterial({
      material: showConfirmDeleteModal.material as Material,
    });
    setShowConfirmDeleteModal({ open: false, material: undefined });
  };

  // Edit
  const {
    isUpdated,
    error: updateMaterialErr,
    updateMaterial,
  } = useUpdateMaterial({
    id: material.id,
    name: material.name,
    quantity: material.quantity,
    description: material.description,
    images: material.images,
    materialGroupId: material.materialGroupId,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    material: Material | undefined;
  }>({ open: false, material: undefined });

  const handleEditMaterial = (material: Material) => {
    setShowUpdateModal({ open: true, material: material });
    setMaterials(material);
  };

  const handleUpdateMaterial = (material: Material | undefined) => {
    updateMaterial({ material: material });
  };

  useEffect(() => {
    let error =
      fetchmaterialsErr ??
      creatematerialErr ??
      deleteMaterialErr ??
      updateMaterialErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted || isUpdated) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setMaterials({} as Material);
        setCrop({ name: "", id: "" });
        setShowModal(false);
      }, 3000);
    }
  }, [
    creatematerialErr,
    deleteMaterialErr,
    fetchmaterialsErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateMaterialErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Vật tư"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên vật tư",
                searchPlaceholder: "Nhập tên vật tư",
                query: query,
                setQuery: setQuery,
              },
            ]}
            filters={[
              <Fragment>
                <label htmlFor="select">Nhóm vật tư</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={""}
                  displayEmpty
                  onChange={() => {}}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <FarmCalendarTable
          materials={materials}
          handleGetImgMaterial={handleGetImgMaterial}
          handleDeleteMaterial={handleDeleteMaterial}
          handleEditMaterial={handleEditMaterial}
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
          <MaterialModal
            title="Thêm vật tư"
            handleCloseModal={() => {
              setShowModal(false);
              setMaterials({});
            }}
            submitButtonLabel="Xác nhận"
            material={material}
            setMaterial={setMaterials}
            onSubmit={handleCreateMaterial}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <MaterialModal
            title="Cập nhật vật tư"
            handleCloseModal={() => {
              setShowUpdateModal({ open: false, material: undefined });
              setMaterials({});
            }}
            submitButtonLabel="Xác nhận"
            material={material}
            setMaterial={setMaterials}
            onSubmit={handleUpdateMaterial}
          />
        )}

        {/* Img modal */}
        {imgMaterial.open && (
          <DefaultModal
            title={`Ảnh ${imgMaterial.material?.name}`}
            onClose={() => {
              setImgMaterial({ open: false, material: undefined });
            }}
          >
            <Carousel>
              {imgMaterial.material?.images?.map((image, i) => (
                <img
                  key={i}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                  src={`http://118.69.126.49:8878/${image}`}
                  alt="FITPRO Farm"
                />
              ))}
            </Carousel>
          </DefaultModal>
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          title="Xác nhận xóa"
          bckColor="var(--second-color)"
          content={
            <p>
              Nhà cung cấp {""}
              <span>{showConfirmDeleteModal.material?.name}</span> sẽ bị xóa
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

export default MaterialPage;
