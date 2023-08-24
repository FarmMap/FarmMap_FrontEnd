export default interface Plant {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name: string;
  disease: string;
  growth: string;
  use: string;
  harvest: string;
  price: number;
  images?: File[];
  groupCrop: any | string;
}
