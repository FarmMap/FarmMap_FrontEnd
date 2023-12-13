import Farm from "./Farm";

export default interface ArgiProduct {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name?: string;
  money?: number;
  quantity?: string;
  weight?: string;
  time?: string;
  images?: File[];
  farm?: any;
}
