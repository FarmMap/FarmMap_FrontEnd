interface LatLngObject {
  point?: number;
  lat: number;
  lng: number;
}

export default interface PlaneArea {
  tenFarm?: string;
  tenKhuDat?: string;
  dienTich?: number;
  latlng: LatLngObject[];
  ghiChu?: string;
}
