export default interface Ingredient {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name?: string;
  quantity?: string;
  weight?: string;
  money?: number;
  information?: string;
  time?: string;
  status?: number;
  images?: File[];
}
