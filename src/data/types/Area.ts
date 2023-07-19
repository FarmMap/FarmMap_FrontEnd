import Farm from "./Farm";

export interface LatLngObject {
  point: number;
  latitude: number;
  longitude: number;
}

export interface Area {
  id?: string;
  name: string;
  acreage: number;
  locations: LatLngObject[];
  description: string;
  avatars?: File[];
  farm?: Farm;
}
