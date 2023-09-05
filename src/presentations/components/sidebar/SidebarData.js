//External files
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import SpaIcon from '@mui/icons-material/Spa';
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import GrassIcon from '@mui/icons-material/Grass';
import PropTypes from 'prop-types';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

export const SidebarData = [
    {
        title: "Trang chủ",
        path: "/",
        icon: <HomeIcon />,
    },
    {
        title: "Thiết bị IOT",
        path: "/thiet-bi-iot",
        icon: <EdgesensorHighIcon />,
    },
    {
        title: "Nông nghiệp",
        path: "",
        icon: <HomeWorkIcon />,
        openIcon: <ArrowDropUpIcon />,
        closeIcon: <ArrowDropDownIcon />,

        subnav: [
            {
                title: "Khu canh tác",
                path: "/nong-nghiep/khu-canh-tac"
            },
            {
                title: "Trang trại",
                path: "/nong-nghiep/trang-trai"
            },
            {
                title: "Vùng canh tác",
                path: "/nong-nghiep/vung-canh-tac"
            },
        ]
    },
    {
        title: "Nông trại",
        path: "",
        icon: <SpaIcon />,
        openIcon: <ArrowDropUpIcon />,
        closeIcon: <ArrowDropDownIcon />,

        subnav: [

            {
                title: "Lịch canh tác",
                path: "/nong-trai/lich-canh-tac"
            },
            {
                title: "Lịch chăm sóc",
                path: "/nong-trai/lich-cham-soc"
            },

        ]
    },

    {
        title: "Nông sản",
        path: "",
        icon: <GrassIcon />,
        openIcon: <ArrowDropUpIcon />,
        closeIcon: <ArrowDropDownIcon />,

        subnav: [
            {
                title: "Cây trồng",
                path: "/nong-san/cay-trong"
            },
            {
                title: "Công việc trong ngày",
                path: "/nong-san/cong-viec-trong-ngay"
            },
            {
                title: "Đặc tính bệnh học",
                path: "/nong-san/dac-tinh-benh-hoc"
            },

        ]
    },

    {
        title: "Kho",
        path: "",
        icon: <StoreIcon />,
        openIcon: <ArrowDropUpIcon />,
        closeIcon: <ArrowDropDownIcon />,

        subnav: [
            {
                title: "Quản lý vật tư",
                path: "/kho/danh-sach-yeu-cau-vat-tu"
            },
            {
                title: "Nguyên liệu",
                path: "/kho/nguyen-lieu"
            },
            {
                title: "Nhập kho",
                path: "/kho/nhap-kho"
            },
            {
                title: "Xuất kho",
                path: "/kho/xuat-kho"
            },
        ]
    },
    {
        title: "Liên hệ",
        path: "/lien-he",
        icon: <AddIcCallIcon />,
    },
    {
        title: "Danh sách yêu cầu",
        path: "",
        icon: <ReceiptLongIcon />,
        openIcon: <ArrowDropUpIcon />,
        closeIcon: <ArrowDropDownIcon />,

        subnav: [
            {
                title: "Yêu cầu",
                path: "/danh-sach-yeu-cau/yeu-cau"
            },
            {
                title: "Khách tham quan",
                path: "/danh-sach-yeu-cau/khach-tham-quan"
            },

        ]
    },

];


export const RightIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26px"
        height="26px"
        className={className}
        viewBox="0 0 24 24"
        version="1.1"
    >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24"></polygon>
            <path
                d="M12.2928955,6.70710318 C11.9023712,6.31657888 11.9023712,5.68341391 12.2928955,5.29288961 C12.6834198,4.90236532 13.3165848,4.90236532 13.7071091,5.29288961 L19.7071091,11.2928896 C20.085688,11.6714686 20.0989336,12.281055 19.7371564,12.675721 L14.2371564,18.675721 C13.863964,19.08284 13.2313966,19.1103429 12.8242777,18.7371505 C12.4171587,18.3639581 12.3896557,17.7313908 12.7628481,17.3242718 L17.6158645,12.0300721 L12.2928955,6.70710318 Z"
                fill="currentColor"
                fillRule="nonzero"
            ></path>
            <path
                d="M3.70710678,15.7071068 C3.31658249,16.0976311 2.68341751,16.0976311 2.29289322,15.7071068 C1.90236893,15.3165825 1.90236893,14.6834175 2.29289322,14.2928932 L8.29289322,8.29289322 C8.67147216,7.91431428 9.28105859,7.90106866 9.67572463,8.26284586 L15.6757246,13.7628459 C16.0828436,14.1360383 16.1103465,14.7686056 15.7371541,15.1757246 C15.3639617,15.5828436 14.7313944,15.6103465 14.3242754,15.2371541 L9.03007575,10.3841378 L3.70710678,15.7071068 Z"
                fill="currentColor"
                fillRule="nonzero"
                opacity="0.3"
                transform="translate(9.000003, 11.999999) rotate(-270.000000) translate(-9.000003, -11.999999) "
            ></path>
        </g>
    </svg>
);

export const LeftIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width="26px"
        height="26px"
        className={className}
        viewBox="0 0 24 24"
        version="1.1"
    >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24"></polygon>
            <path d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                fill="currentColor"
                fillRule="nonzero"
                transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) ">
            </path>
            <path d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                fill="currentColor"
                fillRule="nonzero"
                opacity="0.3"
                transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) ">
            </path>
        </g>
    </svg >
)

export const ListIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        className={className} width="20px" height="20px" viewBox="0 0 24 24" version="1.1" >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24"></polygon>
            <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z"
                fill="currentColor" fillRule="nonzero"></path>
            <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z"
                fill="currentColor" opacity="0.3"></path>
        </g>
    </svg>
)

ListIcon.propTypes = {
    className: PropTypes.string,
}