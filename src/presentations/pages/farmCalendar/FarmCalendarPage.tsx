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
// Style imports
import classNames from "classnames/bind";
import styles from "./FarmCalendar.module.scss";
import Land from "../../../data/types/Land";
import useCreateFarmCalendar from "../../../api/FarmCalendar/useCreateFarmCalendar";
import UserAccount from "../../../data/types/UserAccount";
import FarmCalendar from "../../../data/types/FarmCalendar";
import { toast } from "react-toastify";

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

  useEffect(() => {
    let error = createFarmCalendarErr ?? fetchFarmCalendarErr;
    let isSuccess = isCreated;

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
  }, [isCreated]);

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

        <FarmCalendarTable farmCalendars={farmCalendars} />

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
      </Grid>
    </DefaultWebLayOut>
  );
};

export default FarmCalendarPage;
