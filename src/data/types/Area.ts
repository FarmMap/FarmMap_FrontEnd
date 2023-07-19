interface LatLngObject {
  point?: number;
  latitude: number;
  longitude: number;
}

export default interface Area {
  name?: string;
  acreage?: number;
  locations: LatLngObject[];
  description?: string;
  avatars?: string;
}
