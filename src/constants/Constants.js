import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
const STATUS = [
  { value: "VUA_THEM", name: "Vửa thêm" },
  { value: "VUA_THEM", name: "Vửa thêm" },
  { value: "VUA_THEM", name: "Vửa thêm" },
  { value: "VUA_THEM", name: "Vửa thêm" },
];

const STATUSBILL = [
  {
    value: 1,
    name: "Còn hàng",
  },
  {
    value: 2,
    name: "Hết hàng",
  },
];

const STATUSVISITOR = [
  {
    value: 1,
    name: "Đã tham quan",
  },
  {
    value: 2,
    name: "Đã xác nhận",
  },
  {
    value: 3,
    name: "Chưa xác nhận",
  },
  {
    value: 4,
    name: "Đang chờ",
  },
];

const STATUSINGREDIENT = [
  {
    value: 0,
    name: "Hàng tồn kho",
  },
  {
    value: 1,
    name: "Hết hàng",
  },

];

const TYPEPERSON = [
  { value: "PROVIDER", name: "Nhà cung cấp", icon: <GroupsIcon /> },
  { value: "KHACH_HANG", name: "Khách hàng", icon: <AccountCircleIcon /> },
  { value: "DOI_TUONG_KHAC", name: "Đối tượng khác", icon: <Diversity3Icon /> },
];

export { STATUS, TYPEPERSON, STATUSBILL, STATUSVISITOR, STATUSINGREDIENT };
