/* eslint-disable eqeqeq */
// External
import React, { Fragment, useEffect, useState } from "react";
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import { Grid, MenuItem, Select } from "@mui/material";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut/DefaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
// Internal
// Style imports
import classNames from "classnames/bind";
import styles from "./Company.module.scss";
import CompanyTable from "./CompanyTable";
import { toast } from "react-toastify";
import Farm from "../../../data/types/Farm";
import useCreateFarm from "../../../api/Farm/useCreateFarm";
import useFetchFarmList from "../../../api/Farm/useFetchFarmList";
import CompanyModal from "./CompanyModal";
import DefaultModal from "../../components/defaultModal/DefaultModal";
import Province from "../../../data/types/Province";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import LeafletGeocoder from "../../components/maps/LeafletGeocoder";
import SearchLocationByLatLng from "../../components/maps/SearchLocationByLatLng";
import useFetchAreaList from "../../../api/PlaneArea/useFetchAreaList";
const cx = classNames.bind(styles);

const CompanyPage = () => {
  const position = { lat: 10.964112, lng: 106.856461 };
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImgModal, setShowImgModal] = useState<{
    open: boolean;
    farmImg?: Farm;
  }>({
    open: false,
  });

  // fetch area
  const { areas } = useFetchAreaList({});

  // Show location Farm
  const [showLocationFarm, setShowLocationFarm] = useState<{
    open: boolean;
    farm?: Farm;
  }>({ open: false });

  const handleSeeLocationFarm = (farm: Farm) => {
    setShowLocationFarm((prev) => ({
      open: !prev.open,
      farm: prev.farm === farm ? undefined : farm,
    }));
  };

  // showImgFarmModal
  const [showImgFarmModal, setShowImgFarmModal] = useState<{
    open: boolean;
    farmImg?: Farm;
  }>({
    open: false,
  });

  // support field
  const [businessModelList, setBusinessModelList] = useState<Province>({
    name: "",
  });

  const [businessTypeList, setBusinessTypeList] = useState<Province>({
    name: "",
  });

  const [provinceList, setProvinceList] = useState<Province>({
    name: "",
  });

  const [districtList, setDistrictList] = useState<Province>({
    name: "",
  });

  const [wardsList, setWardsList] = useState<Province>({
    name: "",
  });

  const [farm, setFarm] = useState<Farm>({
    name: "",
    business_model: businessModelList.name,
    business_type: businessTypeList.name,
    province: provinceList.name,
    district: districtList.name,
    wards: wardsList.name,
    address: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    image: undefined,
  });

  const {
    isCreated,
    error: createFarmError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoading: isCreating,
    createFarm,
  } = useCreateFarm({
    name: farm.name,
    business_model: businessModelList.name,
    business_type: businessTypeList.name,
    province: provinceList.name,
    district: districtList.name,
    location: farm.location,
    wards: wardsList.name,
    address: farm.address,
    image: farm.image,
  });

  // Create when submit
  const handleCreateFarmSubmit = (farm: Farm) => {
    createFarm({ farm: farm });
  };
  const [refresh, setRefresh] = useState(false);

  // Fetch farm
  const {
    farms,
    error: fetchFarmErr,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoading,
  } = useFetchFarmList({
    shouldRefesh: refresh,
    page: 1,
  });

  const handleGetInforFarm = (farm: Farm) => {
    setShowImgModal({ open: true, farmImg: farm });
  };

  useEffect(() => {
    let error = createFarmError ?? fetchFarmErr;
    let isSuccess = isCreated;

    if (error != null) {
      toast.error(error);
    }

    if (isSuccess) {
      toast.success("Thao tác thành công!");
      setShowModal(false);
      setFarm({
        name: "",
        business_model: "",
        business_type: "",
        province: "",
        district: "",
        wards: "",
        address: "",
        location: {
          latitude: 0,
          longitude: 0,
        },
        image: undefined,
      });
      setRefresh((refresh) => !refresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreated, createFarmError]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Trang trại"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên trang trại",
                searchPlaceholder: "Nhập tên trang trại",
                query: query,
                setQuery: setQuery,
              },
            ]}
            filters={[
              <Fragment>
                <label htmlFor="select">Mô hình KD</label>
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
              <Fragment>
                <label htmlFor="select">Loại hình KD</label>
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
              <Fragment>
                <label htmlFor="select">Tỉnh thành</label>
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
              <Fragment>
                <label htmlFor="select">Quận huyện</label>
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
              <Fragment>
                <label htmlFor="select">Phường xã</label>
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

        {/* Map */}
        <Grid className="leaflet-container">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Render your map layers, markers, etc. */}
            {/* {viewLocation && <LocationMarker />} */}
            <LeafletGeocoder />
            {showLocationFarm.farm?.location && showLocationFarm.open && (
              <SearchLocationByLatLng
                showPopUp={false}
                lat={showLocationFarm.farm.location.latitude}
                lng={showLocationFarm.farm.location.longitude}
              />
            )}

            {/* Farm */}
            {farms.length > 0 &&
              showLocationFarm.open &&
              farms.map((farm, i) => {
                // Check if the farm has a valid location property
                if (
                  farm.location &&
                  farm.location.latitude !== undefined &&
                  farm.location.longitude !== undefined
                ) {
                  return (
                    <Marker
                      key={i}
                      position={{
                        lat: farm.location.latitude,
                        lng: farm.location.longitude,
                      }}
                      eventHandlers={{
                        click: () =>
                          setShowImgFarmModal({ open: true, farmImg: farm }),
                      }}
                    ></Marker>
                  );
                } else {
                  return null;
                }
              })}

            {showImgFarmModal.farmImg?.image && (
              <DefaultModal
                overrideMaxWidth={{
                  height: {
                    lg: "100vh",
                  },
                }}
                title={
                  <div>
                    <div>- Tên: {showImgFarmModal.farmImg.name}</div>
                    <div>- Địa chỉ: {showImgFarmModal.farmImg.address}</div>
                    <div>
                      - Khu đất:
                      {areas.map((area, i) => (
                        <span key={i}>
                          {" "}
                          {area.farm?.name == showImgFarmModal.farmImg?.name
                            ? area.name
                            : "Trang trại chưa có khu đất"}
                        </span>
                      ))}
                    </div>
                  </div>
                }
                onClose={() => {
                  setShowImgFarmModal({ open: false, farmImg: undefined });
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "90vh",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                  src={`http://118.69.126.49:8878/${showImgFarmModal.farmImg.image}`}
                  alt="FITPRO Farm"
                />
              </DefaultModal>
            )}
          </MapContainer>
          {/* <Map /> */}
        </Grid>

        <CompanyTable
          farms={farms}
          handleGetInforFarm={handleGetInforFarm}
          handleSeeLocationFarm={handleSeeLocationFarm}
          seeLocation={showLocationFarm.open}
          farmProps={showLocationFarm.farm}
        />

        {showModal && (
          <CompanyModal
            title="Thêm doanh nghiệp"
            submitButtonLabel="Xác nhận"
            farm={farm}
            setFarm={setFarm}
            businessModelList={businessModelList}
            setBusinessModeList={setBusinessModelList}
            businessTypeList={businessTypeList}
            setBusinessTypeList={setBusinessTypeList}
            provinceList={provinceList}
            setProVinceList={setProvinceList}
            districtList={districtList}
            setDistrictList={setDistrictList}
            wardList={wardsList}
            setWardList={setWardsList}
            handleCloseModal={() => setShowModal(false)}
            onSubmit={handleCreateFarmSubmit}
          />
        )}

        {showImgModal.open && (
          <DefaultModal
            title={"Ảnh trang trại"}
            onClose={() => {
              setShowImgModal({ open: false, farmImg: undefined });
            }}
          >
            <Fragment>
              {showImgModal.farmImg?.image && (
                <img
                  style={{
                    width: "100%",
                    height: "90vh",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                  src={`http://118.69.126.49:8878/${showImgModal.farmImg.image}`}
                  alt="FITPRO Farm"
                />
              )}
            </Fragment>
          </DefaultModal>
        )}
      </Grid>
    </DefaultWebLayOut>
  );
};

export default CompanyPage;
