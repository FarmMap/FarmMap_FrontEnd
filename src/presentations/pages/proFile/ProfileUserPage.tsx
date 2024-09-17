import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
// Styles
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import useFetchMyAccount from "../../../api/Account/useFetchMyAccount";
import UserAccount from "../../../data/types/UserAccount";
import useUpdateAccountByField from "../../../api/Account/useUpdateAccountByField";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ProfileUserPage = () => {
  const { user } = useFetchMyAccount({});
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [userEdit, setUserEdit] = useState<UserAccount>({
    fullName: user.fullName || "",
    jobTitle: user.jobTitle || "",
    description: user.description || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    role: user.role || "",
    homeTown: user.homeTown || "",
    address: user.address || "",
  });

  // Update userEdit when user changes
  useEffect(() => {
    setUserEdit((prevUserEdit) => ({
      ...prevUserEdit,
      fullName: user.fullName || "",
      jobTitle: user.jobTitle || "",
      description: user.description || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || "",
      homeTown: user.homeTown || "",
      address: user.address || "",
    }));
  }, [
    user.address,
    user.description,
    user.email,
    user.fullName,
    user.homeTown,
    user.jobTitle,
    user.phoneNumber,
    user.role,
  ]);

  // Update
  const {
    updateUserAccount,
    error: updateAccErr,
    isUpdated,
  } = useUpdateAccountByField({
    fullName: userEdit.fullName,
    jobTitle: userEdit.jobTitle,
    description: userEdit.description,
    email: userEdit.email,
    phoneNumber: userEdit.phoneNumber,
    homeTown: userEdit.homeTown,
    address: userEdit.address,
  });

  const handleSaveUser = (userEdit: UserAccount) => {
    updateUserAccount({ userByField: userEdit });
  };

  // Show Noti
  useEffect(() => {
    let error = updateAccErr;
    let isSuccess = isUpdated;

    if (error != null) {
      toast.error(error);
    }

    if (isSuccess) {
      setIsEdit(false);
      toast.success("Cập nhật thành công!");
      setRefresh((refresh) => !refresh);
      window.location.href = "/";
    }
  }, [isUpdated, updateAccErr]);

  return (
    <Grid className={cx("profileUser-wrap")}>
      <p>Thông tin cá nhân</p>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="fullName">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            value={userEdit.fullName ?? ""}
            className={cx("userForm-input")}
            placeholder="Nhập họ và tên"
            disabled={!isEdit}
            onChange={(e) => {
              let newUser: UserAccount = {
                ...userEdit,
                fullName: e.currentTarget.value,
              };
              setUserEdit(newUser);
            }}
          />
        </Grid>

        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="job">Nghề nghiệp</label>
          <input
            type="text"
            id="job"
            value={userEdit.jobTitle ?? ""}
            disabled={!isEdit}
            className={cx("userForm-input")}
            placeholder="Nhập nghề nghiệp"
            onChange={(e) => {
              let newUser: UserAccount = {
                ...userEdit,
                jobTitle: e.currentTarget.value,
              };
              setUserEdit(newUser);
            }}
          />
        </Grid>
      </Grid>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="description">Mô tả</label>
          <input
            type="text"
            id="description"
            value={userEdit.description ?? ""}
            disabled={!isEdit}
            className={cx("userForm-input")}
            placeholder="Nhập mô tả"
            onChange={(e) => {
              let newUser: UserAccount = {
                ...userEdit,
                description: e.currentTarget.value,
              };
              setUserEdit(newUser);
            }}
          />
        </Grid>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={userEdit.email ?? ""}
            disabled={!isEdit}
            className={cx("userForm-input")}
            placeholder="Nhập email"
            onChange={(e) => {
              let newUser: UserAccount = {
                ...userEdit,
                email: e.currentTarget.value,
              };
              setUserEdit(newUser);
            }}
          />
        </Grid>
      </Grid>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            value={userEdit.phoneNumber ?? ""}
            disabled={!isEdit}
            className={cx("userForm-input")}
            placeholder="Nhập số điện thoại"
            onChange={(e) => {
              let newUser: UserAccount = {
                ...userEdit,
                phoneNumber: e.currentTarget.value,
              };
              setUserEdit(newUser);
            }}
          />
        </Grid>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="email">Vai trò</label>
          <input
            type="text"
            id="email"
            value={userEdit.role ?? ""}
            disabled
            className={cx("userForm-input")}
            placeholder="Nhập vai trò"
          />
        </Grid>
      </Grid>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="hometown">Quê quán</label>
          <input
            type="text"
            id="hometown"
            value={userEdit.homeTown ?? ""}
            disabled={!isEdit}
            className={cx("userForm-input")}
            placeholder="Nhập quê quán"
            onChange={(e) => {
              let newUser: UserAccount = {
                ...userEdit,
                homeTown: e.currentTarget.value,
              };
              setUserEdit(newUser);
            }}
          />
        </Grid>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            value={userEdit.address ?? ""}
            disabled={!isEdit}
            className={cx("userForm-input")}
            placeholder="Nhập địa chỉ"
            onChange={(e) => {
              let newUser: UserAccount = {
                ...userEdit,
                address: e.currentTarget.value,
              };
              setUserEdit(newUser);
            }}
          />
        </Grid>
      </Grid>

      <Grid className={cx("button-wrapper")}>
        <Button
          color="success"
          onClick={() => {
            setIsEdit(false);
            setUserEdit({
              fullName: user.fullName || "",
              jobTitle: user.jobTitle || "",
              description: user.description || "",
              email: user.email || "",
              phoneNumber: user.phoneNumber || "",
              role: user.role || "",
              homeTown: user.homeTown || "",
              address: user.address || "",
            });
          }}
          disabled={!isEdit}
          variant="outlined"
        >
          Hủy
        </Button>
        {!isEdit ? (
          <Button
            color="success"
            onClick={() => setIsEdit(true)}
            variant="contained"
          >
            Cập nhật
          </Button>
        ) : (
          <Button
            color="success"
            onClick={() => handleSaveUser(userEdit)}
            variant="contained"
          >
            Lưu
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileUserPage;
