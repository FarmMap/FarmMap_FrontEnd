import React, { Fragment, useEffect, useState } from "react";
// Ex
import { Grid, MenuItem, Select } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import FarmCalendarTable from "./FarmCalendarTable";
import useFetchFarmCalendarList from "../../../api/FarmCalendar/useFetchFarmCalendar";
import FarmCalendarModal from "./FarmCalendarModal";
import Land from "../../../data/types/Land";
import useCreateFarmCalendar from "../../../api/FarmCalendar/useCreateFarmCalendar";
import UserAccount from "../../../data/types/UserAccount";
import FarmCalendar from "../../../data/types/FarmCalendar";
import { toast } from "react-toastify";
import KDialog from "../../components/kDialog/KDialog";
import useDeleteFarmCalendar from "../../../api/FarmCalendar/useDeleteFarmCalendar";

// Style imports
import classNames from "classnames/bind";
import styles from "./FarmCalendar.module.scss";
import useUpdateFarmCalendar from "../../../api/FarmCalendar/useUpdateFarmCalendar";

const cx = classNames.bind(styles);

const FarmCalendarPage = () => {
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // land
  const [land, setLand] = useState<Land>({
    id: "",
    name: "",
    soilType: { name: "", id: "", createdAt: "", updateAt: "" },
    locations: [
      {
        point: 0,
        latitude: 0,
        longitude: 0,
      },
    ],
    images: undefined,
  });
  //
  const [user, setUser] = useState<UserAccount[]>([]);
  // Get farmcalendars
  const { farmCalendars, error: fetchFarmCalendarErr } =
    useFetchFarmCalendarList({
      shouldRefesh: refresh,
    });
  // Create farm
  const {
    isCreated,
    createFarmCalendar,
    error: createFarmCalendarErr,
  } = useCreateFarmCalendar({
    landId: land.id,
  });

  const [userIds, setUserIds] = useState<string[]>([]);

  const handleCreateFarmCalendar = (farmCalendar: FarmCalendar | undefined) => {
    if (farmCalendar) {
      const filteredUserIds: string[] = user
        .filter((item) => item.id !== undefined)
        .map((item) => item.id)
        .filter((id) => id !== undefined) as string[];

      setUserIds(filteredUserIds);
      farmCalendar.users = filteredUserIds;
      createFarmCalendar({ farmCalendar: farmCalendar });
    }
  };

  // Delete
  const {
    deleteFarmCalendar,
    isDeleted,
    error: deleteFarmCalendarErr,
  } = useDeleteFarmCalendar();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    farmCalendar: undefined | FarmCalendar;
  }>({ open: false, farmCalendar: undefined });

  // Cancel Delete close modal, employee = undefined
  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, farmCalendar: undefined });
  };

  // Delete customer when submit
  const handleDeleteFarmCalendarButton = (farmCalendar: FarmCalendar) => {
    setShowConfirmDeleteModal({ open: true, farmCalendar: farmCalendar });
  };

  const handleConfirmDelete = () => {
    deleteFarmCalendar({
      farmCalendar: showConfirmDeleteModal.farmCalendar as FarmCalendar,
    });
    setShowConfirmDeleteModal({ open: false, farmCalendar: undefined });
  };

  // Update
  const {
    isUpdated,
    error: updateFarmCalendarErr,
    updateFarmCalendar,
  } = useUpdateFarmCalendar();
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    farmCalendar: undefined | FarmCalendar;
  }>({ open: false, farmCalendar: undefined });

  const handleEditFarmCalendar = (farmCalendar: FarmCalendar) => {
    setShowUpdateModal({ open: true, farmCalendar: farmCalendar });
  };

  const handleUpdateFarmCalendar = (farmCalendar: FarmCalendar | undefined) => {
    updateFarmCalendar({ farmCalendar: farmCalendar });
  };

  useEffect(() => {
    let error =
      createFarmCalendarErr ??
      fetchFarmCalendarErr ??
      deleteFarmCalendarErr ??
      updateFarmCalendarErr;
    let isSuccess = isCreated ?? isDeleted ?? isUpdated;

    if (error != null) {
      toast.error(error);
    }

    if (isSuccess) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setLand({
          id: "",
          name: "",
          soilType: { name: "", id: "", createdAt: "", updateAt: "" },
          locations: [
            {
              point: 0,
              latitude: 0,
              longitude: 0,
            },
          ],
          images: undefined,
        });
      }, 3000);
    }
  }, [
    createFarmCalendarErr,
    deleteFarmCalendarErr,
    fetchFarmCalendarErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateFarmCalendarErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Lịch canh tác"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên sản phẩm",
                searchPlaceholder: "Nhập tên sản phẩm",
                query: query,
                setQuery: setQuery,
              },
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <FarmCalendarTable
          farmCalendars={farmCalendars}
          handleDeleteFarmCalendar={handleDeleteFarmCalendarButton}
          handleEditFarmCalendar={handleEditFarmCalendar}
        />

        {/* Create modal */}
        {showModal && (
          <FarmCalendarModal
            title="Tạo lịch canh tác"
            handleCloseModal={() => setShowModal(false)}
            submitButtonLabel="Xác nhận"
            land={land}
            setLand={setLand}
            farmCalendar={!isCreated ? undefined : {}}
            user={user}
            setUser={setUser}
            onSubmit={handleCreateFarmCalendar}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <FarmCalendarModal
            title="Cập nhật lịch canh tác"
            handleCloseModal={() =>
              setShowUpdateModal({ open: false, farmCalendar: undefined })
            }
            submitButtonLabel="Xác nhận"
            land={showUpdateModal.farmCalendar?.land}
            setLand={setLand}
            farmCalendar={showUpdateModal.farmCalendar}
            user={user}
            setUser={setUser}
            onSubmit={handleUpdateFarmCalendar}
          />
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          title="Xác nhận xóa"
          content={
            <p>
              Lịch canh tác thuộc vùng{" "}
              <span>{showConfirmDeleteModal.farmCalendar?.land?.name}</span> sẽ
              bị xóa khỏi hệ thống. <br />
              Bạn có muốn xóa nhân viên này không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default FarmCalendarPage;
