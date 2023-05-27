// External files
import { Link } from "react-router-dom";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// Internal files
import { ListIcon } from "./SidebarData";
// Styles
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

interface SubSideBarProps {
  item:
    | {
        title: string;
        path: string;
        icon: JSX.Element;
        openIcon?: undefined;
        closeIcon?: undefined;
        subnav?: undefined;
      }
    | {
        title: string;
        path: string;
        icon: JSX.Element;
        openIcon: JSX.Element;
        closeIcon: JSX.Element;
        subnav?: {
          title: string;
          path: string;
        }[];
      };

  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const SubSideBar: React.FC<SubSideBarProps> = (props) => {
  const { item, openSidebar, setOpenSidebar } = props;
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);

  const handleShowDropDown = () => {
    setOpenDropDown(!openDropdown);
  };
  return (
    <>
      <li className={cx("list-wrap")}>
        <Link
          to={item.path}
          className={cx("list-link")}
          // Logic change Icon && ShowDropDown
          onClick={item.subnav && handleShowDropDown}
        >
          <Tippy content={item.title} placement="right">
            <button
              className={
                openSidebar ? cx("btn-list") : cx("btn-list", "btn-list-hide")
              }
              onClick={() => {
                setOpenSidebar(true);
              }}
            >
              {item.icon}
            </button>
          </Tippy>

          {/* When Sidebar large => show title */}
          {openSidebar && <p className={cx("title")}>{item.title}</p>}

          {/* Change Icon Dropdown */}

          {openSidebar &&
            (item.subnav && openDropdown ? (
              <span>{item.openIcon}</span>
            ) : item.subnav ? (
              <span>{item.closeIcon}</span>
            ) : null)}
        </Link>
      </li>

      {openSidebar && openDropdown && (
        <ul className={cx("dropdown-menu")}>
          {item.subnav?.map((subnavItem, index) => (
            <li key={index}>
              <Link
                to={subnavItem.path}
                className={cx("dropdown-menu-link")}
                key={index}
              >
                <span className={cx("dropdown-menu-icon")}>
                  <ListIcon />
                </span>
                <span className={cx("dropdown-menu-title")}>
                  {subnavItem.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SubSideBar;
