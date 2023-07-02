interface LatLngObject {
  point?: number;
  latitude: number;
  longitude: number;
}

export default interface Area {
  name?: string;
  locations: LatLngObject[];
  description?: string;
}
