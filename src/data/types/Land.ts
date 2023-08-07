import { Area, LatLngObject } from "./Area";
import ProductType from "./ProductType";
import SoilType from "./SoilType";

export default interface Land {
  id?: string;
  name: string;
  productTypeId?: string;
  productType?: ProductType;
  locations: LatLngObject[];
  soilType: SoilType;
  images?: File[];
  area?: Area;
}
