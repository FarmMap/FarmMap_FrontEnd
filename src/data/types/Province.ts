export default interface Province {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  key?: string;
  name: string;
  description?: string;
  child_column?: string;
  id_parent?: string;
  active?: boolean;
}
