import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
const STATUS = [
  { value: "VUA_THEM", name: "Vửa thêm" },
  { value: "VUA_THEM", name: "Vửa thêm" },
  { value: "VUA_THEM", name: "Vửa thêm" },
  { value: "VUA_THEM", name: "Vửa thêm" },
];

const TYPEPERSON = [
  { value: "PROVIDER", name: "Nhà cung cấp", icon: <GroupsIcon /> },
  { value: "KHACH_HANG", name: "Khách hàng", icon: <AccountCircleIcon /> },
  { value: "DOI_TUONG_KHAC", name: "Đối tượng khác", icon: <Diversity3Icon /> },
];

export { STATUS, TYPEPERSON };
