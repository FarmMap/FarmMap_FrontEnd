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

  useEffect(() => {
    let error = fetchPlantsErr ?? createPlantErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated) {
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
    }
  }, [createPlantErr, fetchPlantsErr, isCreated]);

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
            handleCloseModal={() => setShowModal(false)}
            submitButtonLabel="Xác nhận"
            plant={plant}
            setPlant={setPlants}
            onSubmit={handleCreatePlant}
          />
        )}

        {/* Img modal */}
        {imgPlant.open && (
          <DefaultModal
            title={`Ảnh ${imgPlant.plant?.name}`}
            onClose={() => {
              setImgPlant({ open: false, plant: undefined });
            }}
          >
            <Carousel>
              {imgPlant.plant?.images?.map((image, i) => (
                <img
                  key={i}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                  src={`http://116.118.49.43:8878/${image}`}
                  alt="FITPRO Farm"
                />
              ))}
            </Carousel>
          </DefaultModal>
        )}
      </Grid>
    </DefaultWebLayOut>
  );
};

export default PlantPage;
