import Land from "./Land";
import UserAccount from "./UserAccount";

export default interface FarmCalendar {
  id?: string;
  product_name?: string;
  product_type?: string;
  numberOfVarites?: number;
  startDay?: string;
  endDate?: string;
  seedProvider?: string;
  expectOutput?: number;
  unit?: string;
  users?: string[];
  land?: Land;
}
