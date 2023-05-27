// External
import React from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

// Internal files
import DefaultDropDown from "../../defaultDropDown";
import AccountInfo from "./AccountInfo";
import images from "../../../../assets/images";
import DefaultAvatar from "../../defaultAvatar";
// import { UserContext } from "../../../../shared/Context";
// import { ROLES } from "../../../../constant/Constants";

// Styles
import classNames from "classnames/bind";
import styles from "./HeaderRight.module.scss";
const cx = classNames.bind(styles);

interface HeaderRightProps {
  //   onChangePasswordClick: () => void;
}

const HeaderRight: React.FC<HeaderRightProps> = (props: HeaderRightProps) => {
  return (
    <div className={cx("wrapper")}>
      <DefaultDropDown
        childrenRender={
          <AccountInfo
          // user={user}
          // onChangePasswordClick={() => props.onChangePasswordClick()}
          />
        }
        visible={false}
      >
        <Tippy content={`thienan1804`} placement="bottom" theme="light">
          <div
            className={cx("accout-wrapper")}
            // onClick={() => setShowAccount(!showAccount)}
          >
            <div className={cx("username-wrapper")}>
              <span className={cx("username")}>Nguyễn Thiên Ân</span>
              <p className={cx("role")}>Quản trị</p>
            </div>
            <DefaultAvatar avatar={images.avatar} small />
          </div>
        </Tippy>
      </DefaultDropDown>
    </div>
  );
};

export default HeaderRight;
