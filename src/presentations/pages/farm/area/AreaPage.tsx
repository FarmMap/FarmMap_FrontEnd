// External
import React, { Fragment, useEffect, useState } from "react";
import DefaultWebLayOut from "../../../components/defaultWebLayOut/DefaultWebLayOut";
import { Grid, MenuItem, Select } from "@mui/material";
import DefaultTitleLayOut from "../../../components/defaultTitleLayOut/DefaultTitleLayOut";
import DefaultFilterLayOut from "../../../components/defaultTitleLayOut/DefaultFilterLayOut";
import AreaTable from "./AreaTable";
import AreaModal from "./AreaModal";
import { toast } from "react-toastify";
import useFetchAreaList from "../../../../api/PlaneArea/useFetchAreaList";

// Internal
import SoilType from "../../../../data/types/SoilType";
import Land from "../../../../data/types/Land";
import useCreateLand from "../../../../api/Land/useCreateLand";
import useFetchLandList from "../../../../api/Land/useFetchLandList";
import DefaultModal from "../../../components/defaultModal";
import Carousel from "react-material-ui-carousel";
import { Area } from "../../../../data/types/Area";
import useFetchSoilTypeList from "../../../../api/SoilType/useFetchSoilTypeList";
// Style imports
import classNames from "classnames/bind";
import styles from "./Area.module.scss";

const cx = classNames.bind(styles);

const AreaPage = () => {
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Get area list
  const { areas } = useFetchAreaList({
    shouldRefesh: refresh,
  });
  const [area, setArea] = useState<Area>({
    name: "",
    acreage: 0,
    description: "",
    locations: [
      {
        point: 0,
        latitude: 0,
        longitude: 0,
      },
    ],
    avatars: undefined,
  });

  // Get soiltype list
  const { soilTypes } = useFetchSoilTypeList({});
  const [soilType, setSoilType] = useState<SoilType>({
    createdAt: "",
    updateAt: "",
    id: "",
    name: "",
  });

  // Create land
  const [land, setLand] = useState<Land>({
    id: "",
    name: "",
    soilType: soilType,
    productTypeId: "",
    locations: [
      {
        point: 0,
        latitude: 0,
        longitude: 0,
      },
    ],
    images: undefined,
  });

  const {
    isCreated,
    createLand,
    error: CreateLandErr,
  } = useCreateLand({
    areaId: area.id,
    name: land.name,
    acreage: land.acreage,
    productTypeId: land.productTypeId,
    soilTypeId: soilType.id,
    locations: land.locations,
    images: land.images,
  });

  // Get land list
  const { lands, error: fetchFarmErr } = useFetchLandList({
    shouldRefesh: refresh,
  });

  // handleSubmitCreateLand
  const handleSubmitCreateLand = (land: Land) => {
    createLand({ land: land });
  };

  useEffect(() => {
    let error = CreateLandErr ?? fetchFarmErr;
    let isSuccess = isCreated;

    if (error != null) {
      toast.error(error);
    }

    if (isSuccess) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setArea({
          name: "",
          acreage: 0,
          description: "",
          locations: [
            {
              point: 0,
              latitude: 0,
              longitude: 0,
            },
          ],
          avatars: undefined,
        });

        setSoilType({
          createdAt: "",
          updateAt: "",
          id: "",
          name: "",
        });
      }, 3000);

      setLand({
        id: "",
        name: "",
        soilType: soilType,
        productTypeId: "",
        locations: [
          {
            point: 0,
            latitude: 0,
            longitude: 0,
          },
        ],
        images: undefined,
      });
    }
  }, [isCreated, CreateLandErr]);

  // Get img
  const [imgLand, setImgLand] = useState<{
    open: boolean;
    land?: Land;
  }>({ open: false });

  const handleGetImgLand = (land: Land) => {
    setImgLand({ open: true, land: land });
  };

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Vùng trồng"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên vùng trồng",
                searchPlaceholder: "Nhập tên vùng trồng",
                query: query,
                setQuery: setQuery,
              },
            ]}
            filters={[
              <Fragment>
                <label htmlFor="select">Tỉnh thành </label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={""}
                  displayEmpty
                  onChange={() => { }}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
              <Fragment>
                <label htmlFor="select">Quận-Huyện</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={""}
                  displayEmpty
                  onChange={() => { }}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
              <Fragment>
                <label htmlFor="select">Loại sản phẩm</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={""}
                  displayEmpty
                  onChange={() => { }}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
              <Fragment>
                <label htmlFor="select">Loại đất</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={""}
                  displayEmpty
                  onChange={() => { }}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <AreaTable handleGetImgLand={handleGetImgLand} lands={lands} />

        {showModal && (
          <AreaModal
            title="Thêm vùng trồng"
            submitButtonLabel="Xác nhận"
            handleCloseModal={() => setShowModal(false)}
            areas={areas}
            area={area}
            setArea={setArea}
            soilTypes={soilTypes}
            soilType={soilType}
            setSoilType={setSoilType}
            land={land}
            setLand={setLand}
            lands={lands}
            handleSubmitCreateLand={handleSubmitCreateLand}
            isDisabled={false}
          />
        )}

        {/* Img modal */}
        {imgLand.open && (
          <DefaultModal
            title={`Ảnh ${imgLand.land?.name}`}
            onClose={() => {
              setImgLand({ open: false, land: undefined });
            }}
          >
            <Carousel>
              {imgLand.land?.images?.map((image, i) => (
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

export default AreaPage;
