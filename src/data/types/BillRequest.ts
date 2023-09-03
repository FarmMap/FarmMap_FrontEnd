import Providor from "./Providor";
import Province from "./Province";

export default interface BillRequest {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name?: string;
  quantity?: number;
  description?: string;
  status?: number;
  materialId?: string;
  material?: Province;
  provider?: Providor;
  providerId?: string;
}
