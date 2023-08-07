import Land from "./Land";
import ProductType from "./ProductType";

export default interface FarmCalendar {
  id?: string;
  product_name?: string;
  productType?: ProductType;
  productTypeId?: string;
  numberOfVarites?: number;
  startDay?: string;
  endDate?: string;
  seedProvider?: string;
  expectOutput?: number;
  unit?: string;
  users?: string[];
  land?: Land;
}
