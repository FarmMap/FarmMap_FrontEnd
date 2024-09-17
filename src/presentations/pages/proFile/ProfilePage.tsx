import React, { useEffect, useRef, useState } from "react";

// Ex
import { Grid, Button } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultAvatar from "../../components/defaultAvatar";
import images from "../../../assets/images";
import ProfileUserPage from "./ProfileUserPage";
import useFetchMyAccount from "../../../api/Account/useFetchMyAccount";
import UserAccount from "../../../data/types/UserAccount";

// Styles
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { toast } from "react-toastify";
import { toReadableDate } from "../../../utils/Utils";
import useUpdateUserAvt from "../../../api/Account/useUpdateAvt";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useFetchMyAccount({
    shouldRefesh: refresh,
  });

  // Ref để tham chiếu tới input file
  const fileInputRef = useRef(null);
  const [userEdit, setUserEdit] = useState<UserAccount>({
    id: user.id || "",
    avatar: user.avatar || undefined,
    createdAt: user.createdAt || "",
  });

  // Update userEdit when user changes
  useEffect(() => {
    setUserEdit((prevUserEdit) => ({
      ...prevUserEdit,
      avatar: user.avatar || undefined,
      id: user.id || "",
      createdAt: user.createdAt || "",
    }));
  }, [user.avatar, user.createdAt, user.id]);

  // handleSaveImg
  const {
    updateUserAvt,
    error: updateAccErr,
    isUpdated,
  } = useUpdateUserAvt({
    avatar: userEdit.avatar,
  });
  const handleSaveImg = (userEdit: UserAccount) => {
    updateUserAvt({ userByField: userEdit });
  };

  // Show Noti
  useEffect(() => {
    let error = updateAccErr;
    let isSuccess = isUpdated;

    if (error != null) {
      toast.error(error);
    }

    if (isSuccess) {
      toast.success("Cập nhật thành công!");
      setIsEdit(false);
      setRefresh((refresh) => !refresh);
      window.location.href = "/";
    }
  }, [isUpdated, updateAccErr]);

  return (
    <DefaultWebLayOut>
      <Grid className={cx("wrapper")}>
        <Grid className={cx("header")}>
          <p>Trang cá nhân</p>
          <HelpIcon />
          <span className={cx("header-createAt")}>
            Tài khoản được tạo vào ngày {toReadableDate(userEdit.createdAt)}
          </span>
        </Grid>

        <Grid className={cx("avt-wrapper")}>
          <p>Ảnh đại diện </p>
          <Grid className={cx("img-wrapper")}>
            {isEdit ? (
              <DefaultAvatar
                avatar={
                  userEdit.avatar instanceof File
                    ? URL.createObjectURL(userEdit.avatar)
                    : `http://118.69.126.49:8878/${userEdit.avatar}` || "" // Use an empty string if userEdit.avatar is null
                }
                large
              />
            ) : (
              <DefaultAvatar
                avatar={
                  `http://118.69.126.49:8878/${userEdit.avatar}` ||
                  images.avatar
                }
                large
              />
            )}
            {/* file input */}
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              ref={fileInputRef}
              id="file-input"
              onChange={(e) => {
                const fileInput = e.target;
                if (
                  fileInput &&
                  fileInput.files &&
                  fileInput.files.length > 0
                ) {
                  const file = fileInput.files[0];

                  // Cập nhật state image với File ảnh đã chọn
                  setUserEdit((prevUser) => ({
                    ...prevUser,
                    avatar: file, // Set to the selected File object
                  }));
                }
              }}
            />
            <label htmlFor="file-input">
              {!isEdit ? (
                <Button
                  disableElevation={true}
                  component="span"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                  className={cx("update-btn")}
                  variant="contained"
                >
                  Cập nhật
                </Button>
              ) : (
                <Button
                  onClick={() => handleSaveImg(userEdit)}
                  className={cx("update-btn")}
                  variant="contained"
                >
                  Lưu
                </Button>
              )}
            </label>
            <Button
              disabled={!isEdit}
              onClick={() => {
                setIsEdit(false);
                setUserEdit({
                  avatar: user.avatar || undefined,
                  createdAt: user.createdAt || undefined,
                });
              }}
              className={cx("remove-btn")}
              variant="outlined"
            >
              Xóa ảnh
            </Button>
          </Grid>
        </Grid>

        <Grid mt={"12px"}>
          <ProfileUserPage />
        </Grid>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default ProfilePage;
