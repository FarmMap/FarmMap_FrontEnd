import Province from "./Province";

export default interface Material {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name?: string;
  quantity?: number;
  description?: string;
  images?: File[];
  materialGroupId?: string;
  materialGroup?: Province;
}
