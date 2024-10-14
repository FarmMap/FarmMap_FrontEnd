import React, { useEffect, useState } from "react";
// Ex
import { Grid, Pagination } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import FarmCalendarTable from "./PlantTable";
import Plant from "../../../data/types/Plant";
import { toast } from "react-toastify";
import useFetchPlants from "../../../api/Plant/useFetchPlants";
import DefaultModal from "../../components/defaultModal";
import Carousel from "react-material-ui-carousel";
import useCreatePlant from "../../../api/Plant/useCreatePlant";
import Province from "../../../data/types/Province";
import PlantModal from "./PlantModal";
// Style imports
import classNames from "classnames/bind";
import styles from "./Plant.module.scss";
import useDeletePlant from "../../../api/Plant/useDeletePlant";
import useUpdatePlant from "../../../api/Plant/useUpdatePlant";
import KDialog from "../../components/kDialog/KDialog";
import PlantImageModal from "./PlantImgModal";

const cx = classNames.bind(styles);

const PlantPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [plant, setPlants] = useState<Plant>({
    name: "",
    disease: "",
    growth: "",
    use: "",
    harvest: "",
    price: 0,
    images: undefined,
    groupCrop: "",
  });

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };

  //
  // Get plants
  const {
    plants,
    error: fetchPlantsErr,
    isLoading,
    pages,
  } = useFetchPlants({
    shouldRefesh: refresh,
    page: page,
    query: query,
  });

  // Create plants
  const [crop, setCrop] = useState<Province>({
    name: "",
  });
  const {
    isCreated,
    error: createPlantErr,
    createPlant,
  } = useCreatePlant({
    name: plant.name,
    disease: plant.disease,
    growth: plant.growth,
    use: plant.use,
    harvest: plant.harvest,
    price: plant.price,
    images: plant.images,
    groupCrop: plant.groupCrop,
  });
  const handleCreatePlant = (plant: Plant | undefined) => {
    createPlant({ plant: plant });
  };
  // Get img
  const [imgPlant, setImgPlant] = useState<{
    open: boolean;
    plant?: Plant;
  }>({ open: false });

  const handleGetImgPlant = (plant: Plant) => {
    setImgPlant({ open: true, plant: plant });
  };

  // Delete plant

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    plant: undefined | Plant;
  }>({ open: false, plant: undefined });
  const { isDeleted, deletePlant, error: deletePlantErr } = useDeletePlant();

  const handleDeletePlantButton = (plant: Plant) => {
    setShowConfirmDeleteModal({ open: true, plant: plant });
  };

  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, plant: undefined });
  };

  const handleConfirmDelete = () => {
    deletePlant({ plant: showConfirmDeleteModal.plant as Plant });
    setShowConfirmDeleteModal({ open: false, plant: undefined });
  };

  // Update plant
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { isUpdated, updatePlant, error: updatePlantErr } = useUpdatePlant();

  const handleEditPlantButton = (plant: Plant) => {
    setShowUpdateModal(true);
    setPlants(plant);
  };

  const handleEditPlant = (plant: Plant | undefined) => {
    if (typeof plant?.groupCrop === "object") {
      const updatedPlant = { ...plant, groupCrop: plant.groupCrop.id };
      setPlants(updatedPlant);
      updatePlant({ plant: updatedPlant });
    } else {
      updatePlant({ plant: plant });
    }
  };

  useEffect(() => {
    let error =
      fetchPlantsErr ?? createPlantErr ?? deletePlantErr ?? updatePlantErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted || isUpdated) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setPlants({
          name: "",
          disease: "",
          growth: "",
          use: "",
          harvest: "",
          price: 0,
          images: undefined,
          groupCrop: "",
        });
        setCrop({ name: "", id: "" });
        setShowModal(false);
      }, 3000);
      setShowModal(false);
      setShowUpdateModal(false);
    }
  }, [
    createPlantErr,
    deletePlantErr,
    fetchPlantsErr,
    isCreated,
    isDeleted,
    isUpdated,
    updatePlantErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Cây trồng"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên cây trồng",
                searchPlaceholder: "Nhập tên cây trồng",
                query: query,
                setQuery: setQuery,
              },
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <FarmCalendarTable
          plants={plants}
          handleGetImgPlant={handleGetImgPlant}
          handleDeletePlant={handleDeletePlantButton}
          handleEditPlant={handleEditPlantButton}
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
          <PlantModal
            title="Thêm cây trồng"
            handleCloseModal={() => {
              setShowModal(false);
              setPlants({
                name: "",
                disease: "",
                growth: "",
                use: "",
                harvest: "",
                price: 0,
                images: undefined,
                groupCrop: "",
              });
            }}
            submitButtonLabel="Xác nhận"
            plant={plant}
            setPlant={setPlants}
            onSubmit={handleCreatePlant}
          />
        )}

        {/* Update modal */}
        {showUpdateModal && (
          <PlantModal
            title="Cập nhật cây trồng"
            handleCloseModal={() => {
              setShowUpdateModal(false);
              setPlants({
                name: "",
                disease: "",
                growth: "",
                use: "",
                harvest: "",
                price: 0,
                images: undefined,
                groupCrop: "",
              });
            }}
            submitButtonLabel="Xác nhận"
            plant={plant}
            setPlant={setPlants}
            onSubmit={handleEditPlant}
          />
        )}

        {/* Img modal */}
        {imgPlant.open && (
          <PlantImageModal
            title="Danh sách ảnh cây trồng"
            plant={imgPlant.plant as Plant}
            handleCloseModal={() => setImgPlant({ open: false })}
            onUploadSuccess={() => {
              setImgPlant({ open: false });
              setRefresh((refresh) => !refresh);
            }}
          />
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          title="Xác nhận xóa"
          bckColor="var(--second-color)"
          content={
            <p>
              Cây trồng{" "}
              <span style={{ color: "var(--blue-color2)" }}>
                {showConfirmDeleteModal.plant?.name}
              </span>{" "}
              sẽ bị xóa khỏi hệ thống. <br />
              Bạn có muốn xóa cây trồng này không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default PlantPage;
