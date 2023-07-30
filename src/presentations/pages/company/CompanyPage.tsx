// External
import React, { Fragment, useEffect, useState } from "react";
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import { Grid, MenuItem, Select } from "@mui/material";
import FormInput from "../../components/formInput/FormInput";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut/DefaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
// Internal
// Style imports
import classNames from "classnames/bind";
import styles from "./Company.module.scss";
import AreaTable from "./CompanyTable";
import { toast } from "react-toastify";
import Farm from "../../../data/types/Farm";
import useCreateFarm from "../../../api/Farm/useCreateFarm";
import useFetchFarmList from "../../../api/Farm/useFetchFarmList";
import CompanyModal from "./CompanyModal";
import DefaultModal from "../../components/defaultModal/DefaultModal";
const cx = classNames.bind(styles);

const CompanyPage = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImgModal, setShowImgModal] = useState<{
    open: boolean;
    farmImg?: Farm;
  }>({
    open: false,
  });

  const [farm, setFarm] = useState<Farm>({
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

  const {
    isCreated,
    error: createFarmError,
    isLoading: isCreating,
    createFarm,
  } = useCreateFarm({
    name: farm.name,
    business_model: farm.business_model,
    business_type: farm.business_type,
    province: farm.province,
    district: farm.district,
    location: farm.location,
    wards: farm.wards,
    address: farm.address,
    image: farm.image,
  });

  // Create when submit
  const handleCreateFarmSubmit = (farm: Farm) => {
    createFarm({ farm: farm });
  };
  const [refresh, setRefresh] = useState(false);

  // Fetch
  const {
    farms,
    error: fetchFarmErr,
    isLoading,
  } = useFetchFarmList({
    shouldRefesh: refresh,
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
                  value={"Hi"}
                  displayEmpty
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <AreaTable farms={farms} handleGetInforFarm={handleGetInforFarm} />

        {showModal && (
          <CompanyModal
            title="Thêm doanh nghiệp"
            submitButtonLabel="Xác nhận"
            farm={farm}
            setFarm={setFarm}
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
                  src={`http://116.118.49.43:8878/${showImgModal.farmImg.image}`}
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
