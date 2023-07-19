export default interface Farm {
  id?: string;
  name: string;
  business_model: string;
  business_type: string;
  province: string;
  district: string;
  wards: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  image?: File;
}
