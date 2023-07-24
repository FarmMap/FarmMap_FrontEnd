import { Area, LatLngObject } from "./Area";
import { SoilType } from "./SoilType";

export default interface Land {
  id?: string;
  name: string;
  locations: LatLngObject[];
  soilType: SoilType;
  images?: File[];
  area?: Area;
}
