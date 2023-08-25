import Land from "./Land";
import Plant from "./Plant";

export default interface Todo {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  implement_at?: string;
  completed_at?: string;
  job?: string;
  description?: string;
  land?: Land;
  crop?: Plant;
}
