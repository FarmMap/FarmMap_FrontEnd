export default interface ProductType {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  key?: string;
  name?: string;
  description?: string;
  child_column?: {
    color?: string;
  };
  id_parent?: string;
  active?: boolean;
}
