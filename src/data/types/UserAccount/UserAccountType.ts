import PlaceType from "../Place/PlaceType";

export default interface UserAccountType {
  id?: number;
  fullName?: string;
  uid?: string;
  email?: string;
  phone?: string;
  provider?: string;
  roles?: string;
  isNew?: string;
  address?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  province?: PlaceType;
  district?: PlaceType;
  ward?: PlaceType;
}
