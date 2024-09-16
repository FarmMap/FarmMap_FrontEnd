// External
import React, { useEffect, useRef, useState } from "react";
import DefaultModal from "../../components/defaultModal/DefaultModal";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tippy from "@tippyjs/react";
import ImageIcon from "@mui/icons-material/Image";
// Internal
import FormInput from "../../components/formInput/FormInput";
import FloatingLabelInput from "../../components/floatingLabelInput/FloatingLabelInput";
import SearchLocationByLatLng from "../../components/maps/SearchLocationByLatLng";

// Style
import classNames from "classnames/bind";
import styles from "./Company.module.scss";
import Farm from "../../../data/types/Farm";
import useFetchProvinceList from "../../../api/Farm/useFetchCategoryList";
import Province from "../../../data/types/Province";
import useFetchCategoryDetail from "../../../api/Category-detail/useFetchCategoryDetail";

const cx = classNames.bind(styles);

interface CompanyModalProps {
  title: string;
  submitButtonLabel: string;
  handleCloseModal: () => void;
  farm: Farm;
  setFarm: React.Dispatch<React.SetStateAction<Farm>>;
  businessModelList: Province;
  setBusinessModeList: React.Dispatch<React.SetStateAction<Province>>;
  businessTypeList: Province;
  setBusinessTypeList: React.Dispatch<React.SetStateAction<Province>>;
  provinceList: Province;
  setProVinceList: React.Dispatch<React.SetStateAction<Province>>;
  districtList: Province;
  setDistrictList: React.Dispatch<React.SetStateAction<Province>>;
  wardList: Province;
  setWardList: React.Dispatch<React.SetStateAction<Province>>;
  onSubmit: (farm: Farm) => void;
}
const CompanyModal = (props: CompanyModalProps) => {
  const position = { lat: 10.964112, lng: 106.856461 };

  const [countLocal, setCountLocal] = useState<number[]>([]);
  useEffect(() => {
    const storedCount = localStorage.getItem("count");
    if (storedCount) {
      setCountLocal(JSON.parse(storedCount));
    } else {
      setCountLocal([1]);
    }
  }, []);

  // See location

  const [geocoderLatLng, setGeocoderLatLng] = useState<[number, number]>([
    0, 0,
  ]);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleSeeLocation = () => {
    setLat(geocoderLatLng[0]);
    setLng(geocoderLatLng[1]);
  };

  // API
  const { provinces: business_models } = useFetchProvinceList({
    type: "BUSINESS_MODEL",
  });

  const { provinces: business_types } = useFetchProvinceList({
    type: "BUSINESS_TYPE",
  });

  const [province, setProVince] = useState<Province>({
    name: "",
  });

  const [district, setDistrict] = useState<Province>({
    name: "",
  });

  const { provinces } = useFetchProvinceList({
    type: "TINH_THANH",
  });

  const { cateDetails: districts } = useFetchCategoryDetail({
    id: province.key,
  });

  const { cateDetails: wards } = useFetchCategoryDetail({
    id: district.key,
  });
  // Ref để tham chiếu tới input file
  const fileInputRef = useRef(null);

  return (
    <DefaultModal
      overrideMaxWidth={{
        lg: "900px",
      }}
      title={props.title}
      onClose={props.handleCloseModal}
    >
      <Grid>
        <Grid>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Render your map layers, markers, etc. */}
            {lat && lng && (
              <SearchLocationByLatLng showPopUp={true} lat={lat} lng={lng} />
            )}
            {/* {viewLocation && <LocationMarker />} */}
          </MapContainer>
          {/* <Map /> */}
        </Grid>

        <Grid container spacing={3} style={{ margin: "30px 0 0 0" }}>
          <FormInput
            label="Tên doanh nghiệp"
            placeholder="Nhập tên doanh nghiệp"
            type="text"
            value={props.farm.name ?? ""}
            onChange={(e) => {
              let newFarm = { ...props.farm };
              newFarm.name = e.currentTarget.value;
              props.setFarm(newFarm);
            }}
            required
          />
        </Grid>

        <Grid className={cx("company-wrapper")} container columns={12}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-company")} htmlFor="mo-hinh-kd">
              Mô hình kinh doanh
            </label>
          </Grid>
          <Grid
            item
            lg={7.26}
            md={7}
            xs={12}
            sm={12}
            sx={{
              paddingLeft: {
                lg: "30px",
                md: "30px",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={business_models}
              getOptionLabel={(option: Province) => option.name as string}
              noOptionsText="Không tìm thấy mô hình kinh doanh nào"
              onChange={(event, value: Province | null) => {
                if (value == null) return;
                props.setBusinessModeList({
                  ...props.businessModelList,
                  name: value.name,
                });
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn mô hình kinh doanh" />
              )}
            />
          </Grid>
        </Grid>

        <Grid className={cx("company-wrapper")} container columns={12}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-company")} htmlFor="loai-hinh-kd">
              Loại hình kinh doanh
            </label>
          </Grid>
          <Grid
            item
            lg={7.26}
            md={7}
            xs={12}
            sm={12}
            sx={{
              paddingLeft: {
                lg: "30px",
                md: "30px",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={business_types}
              getOptionLabel={(option: Province) => option.name as string}
              noOptionsText="Không tìm thấy loại hình kinh doanh nào"
              onChange={(event, value: Province | null) => {
                if (value == null) return;
                props.setBusinessTypeList({
                  ...props.businessTypeList,
                  name: value.name,
                });
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn loại hình kinh doanh" />
              )}
            />
          </Grid>
        </Grid>

        <Grid className={cx("company-wrapper")} container columns={12}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-company")} htmlFor="tinh">
              Tỉnh <span>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7.26}
            md={7}
            xs={12}
            sm={12}
            sx={{
              paddingLeft: {
                lg: "30px",
                md: "30px",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={provinces}
              getOptionLabel={(option: Province) => option.name as string}
              noOptionsText="Không tìm thấy tỉnh nào"
              onChange={(event, value: Province | null) => {
                if (value == null) return;
                props.setProVinceList({
                  ...props.provinceList,
                  name: value.name,
                });
                setProVince({
                  ...province,
                  name: value.name,
                  key: value.key,
                });
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn tỉnh" />
              )}
            />
          </Grid>
        </Grid>

        <Grid className={cx("company-wrapper")} container columns={12}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-company")} htmlFor="quan">
              Quận/Huyện <span>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7.26}
            md={7}
            xs={12}
            sm={12}
            sx={{
              paddingLeft: {
                lg: "30px",
                md: "30px",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={districts}
              // eslint-disable-next-line eqeqeq
              disabled={province.name == undefined || province.key == undefined}
              getOptionLabel={(option: Province) => option.name as string}
              noOptionsText="Không tìm thấy quận huyện nào"
              onChange={(event, value: Province | null) => {
                if (value == null) return;
                props.setDistrictList({
                  ...props.districtList,
                  name: value.name,
                });
                setDistrict({
                  ...district,
                  name: value.name,
                  key: value.key,
                });
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn quận huyện" />
              )}
            />
          </Grid>
        </Grid>

        <Grid className={cx("company-wrapper")} container columns={12}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-company")} htmlFor="phuong">
              Phường/Xã <span>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7.26}
            md={7}
            xs={12}
            sm={12}
            sx={{
              paddingLeft: {
                lg: "30px",
                md: "30px",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={wards}
              // eslint-disable-next-line eqeqeq
              disabled={district.name == undefined || district.key == undefined}
              getOptionLabel={(option: Province) => option.name as string}
              noOptionsText="Không tìm thấy phường xã nào"
              onChange={(event, value: Province | null) => {
                if (value == null) return;
                props.setWardList({
                  ...props.wardList,
                  name: value.name,
                });
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn phường xã" />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ margin: "10px 0 0 0" }}>
          <FormInput
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
            type="text"
            value={props.farm.address ?? ""}
            onChange={(e) => {
              let newFarm = { ...props.farm };
              newFarm.address = e.currentTarget.value;
              props.setFarm(newFarm);
            }}
          />
        </Grid>
        {countLocal.map((item, i) => (
          <Grid justifyContent={"space-around"} container columns={12}>
            <Grid
              item
              lg={3}
              md={3}
              sm={4}
              xs={12}
              className={cx("form-control-wrapper")}
            >
              <label className={cx("form-input-label")} htmlFor={"lat"}>
                Vị trí
              </label>
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              sm={4}
              xs={6}
              className={cx("form-control-wrapper")}
            >
              <FloatingLabelInput
                label="lat"
                placeholder="nhập lat"
                type="number"
                value={props.farm.location?.latitude.toString() ?? ""}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  let newFarm = { ...props.farm };
                  newFarm.location.latitude =
                    parseFloat((event.target as HTMLInputElement).value) || 0;
                  const newLatLng: [number, number] = [
                    newFarm.location.latitude,
                    props.farm.location?.longitude,
                  ];
                  setGeocoderLatLng(newLatLng);
                  props.setFarm(newFarm);
                }}
              />
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              sm={4}
              xs={6}
              className={cx("form-control-wrapper")}
            >
              <FloatingLabelInput
                label="lng"
                placeholder="nhập lng"
                type="number"
                value={props.farm.location?.longitude.toString() ?? ""}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  let newFarm = { ...props.farm };
                  newFarm.location.longitude =
                    parseFloat((event.target as HTMLInputElement).value) || 0;
                  const newLatLng: [number, number] = [
                    props.farm.location.latitude,
                    newFarm.location?.longitude,
                  ];
                  setGeocoderLatLng(newLatLng);
                  props.setFarm(newFarm);
                }}
              />
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              height={"54px"}
              item
              lg={2}
              md={2}
              sm={4}
              xs={6}
            >
              <Tippy content={`Xem vị trí`}>
                <Button
                  style={{
                    backgroundColor: "var(--white-color)",
                    borderColor: "transparent",
                    color: "var(--blue-color2)",
                  }}
                  onClick={handleSeeLocation}
                  variant="outlined"
                  size="medium"
                >
                  <VisibilityIcon className={cx("see-icon")} />
                </Button>
              </Tippy>
            </Grid>

            <Grid>
              {props.farm.image && (
                <img
                  src={
                    props.farm.image instanceof File
                      ? URL.createObjectURL(props.farm.image)
                      : props.farm.image || "" // Use an empty string if farm.image is null
                  }
                  alt="Chọn hình ảnh"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                />
              )}
            </Grid>
          </Grid>
        ))}

        <Grid
          container
          columns={12}
          justifyContent={"flex-end"}
          marginTop={"20px"}
        >
          <Grid item xs={5}>
            {" "}
          </Grid>
          <Grid item xs={5}>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              ref={fileInputRef}
              id="file-input"
              onChange={(e) => {
                const fileInput = e.target;
                if (
                  fileInput &&
                  fileInput.files &&
                  fileInput.files.length > 0
                ) {
                  const file = fileInput.files[0];

                  // Cập nhật state farm.image với File ảnh đã chọn
                  props.setFarm((prevFarm) => ({
                    ...prevFarm,
                    image: file, // Set to the selected File object
                  }));
                }
              }}
            />

            <label htmlFor="file-input">
              <Button
                style={{ marginRight: 12 }}
                variant="outlined"
                color="success"
                startIcon={<ImageIcon />}
                disableElevation={true}
                component="span"
              >
                Thêm ảnh
              </Button>
            </label>
            <Button
              variant="contained"
              disabled={
                // eslint-disable-next-line eqeqeq
                props.farm.name == "" ||
                // eslint-disable-next-line eqeqeq
                props.districtList.name == "" ||
                // eslint-disable-next-line eqeqeq
                props.provinceList.name == "" ||
                // eslint-disable-next-line eqeqeq
                props.wardList.name == "" ||
                // eslint-disable-next-line eqeqeq
                props.farm.image == undefined
              }
              disableElevation={true}
              startIcon={<SaveIcon />}
              onClick={() => props.onSubmit(props.farm)}
            >
              {props.submitButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default CompanyModal;
