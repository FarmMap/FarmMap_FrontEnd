import React, { Fragment, useEffect, useState } from "react";
// Ex
import { Grid, MenuItem, Pagination, Select } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import useFetchFarmCalendarList from "../../../api/FarmCalendar/useFetchFarmCalendar";
import Land from "../../../data/types/Land";
import useCreateFarmCalendar from "../../../api/FarmCalendar/useCreateFarmCalendar";
import UserAccount from "../../../data/types/UserAccount";
import FarmCalendar from "../../../data/types/FarmCalendar";
import { toast } from "react-toastify";
import FarmLaborTable from "./FarmLaborTable"
import KDialog from "../../components/kDialog/KDialog";
import useDeleteFarmCalendar from "../../../api/FarmCalendar/useDeleteFarmCalendar";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Button } from "antd";
// Style imports
import classNames from "classnames/bind";
import styles from "./FarmLabor.module.scss";
import useUpdateFarmCalendar from "../../../api/FarmCalendar/useUpdateFarmCalendar";

const cx = classNames.bind(styles);

const FarmLaborPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };

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
  const {
    farmCalendars,
    error: fetchFarmCalendarErr,
    isLoading,
    pages,
  } = useFetchFarmCalendarList({
    shouldRefesh: refresh,
    page: page,
    query: query,
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
    if (farmCalendar) {
      const filteredUserIds: string[] = user
        .filter((item) => item.id !== undefined)
        .map((item) => item.id)
        .filter((id) => id !== undefined) as string[];

      setUserIds(filteredUserIds);
      farmCalendar.users = filteredUserIds;
      updateFarmCalendar({ farmCalendar: farmCalendar });
    }
  };

  useEffect(() => {
    let error =
      createFarmCalendarErr ??
      fetchFarmCalendarErr ??
      deleteFarmCalendarErr ??
      updateFarmCalendarErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted || isUpdated) {
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
          heading="Nhân công"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
          btnElement={
            <Fragment>
              
              <Button
                type="primary"
                size={"large"}
                onClick={() => setShowModal(true)}
              >
                <AddIcon style={{ height: "24px" }} />
              </Button>
            </Fragment>
          }
        >
          <Grid></Grid>
        </DefaultTitleLayOut>
        <FarmLaborTable
          farmCalendars={farmCalendars}
          handleDeleteFarmCalendar={handleDeleteFarmCalendarButton}
          handleEditFarmCalendar={handleEditFarmCalendar}
        />

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          bckColor="var(--blue-hover-color)"
          title="Xác nhận xóa"
          content={
            <p>
              Bạn có muốn xóa{" "}
              <span>{showConfirmDeleteModal.farmCalendar?.land?.name}</span> 
             ra khỏi hệ thống. <br />
              Bạn có muốn xóa không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
    
  );
};

export default FarmLaborPage;
