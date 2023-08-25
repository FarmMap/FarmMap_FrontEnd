import React, { useEffect, useState } from "react";
// Ex
import { Grid, Pagination } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import TodoTable from "./TodoTable";
import TodoModal from "./TodoModal";
import Land from "../../../data/types/Land";
import useCreateTodo from "../../../api/Todo/useCreateTodo";
import UserAccount from "../../../data/types/UserAccount";
import Todo from "../../../data/types/Todo";
import { toast } from "react-toastify";
import KDialog from "../../components/kDialog/KDialog";
import useDeleteTodo from "../../../api/Todo/useDeleteProvidor";
import useFetchTodo from "../../../api/Todo/useFetchProvidorList";

import Plant from "../../../data/types/Plant";
import useUpdateTodo from "../../../api/Todo/useUpdateProvidor";
// Style imports
import classNames from "classnames/bind";
import styles from "./Todo.module.scss";

const cx = classNames.bind(styles);

const TodoPage = () => {
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

  const [crop, setCrop] = useState<Plant>({} as Plant);
  //
  const [user, setUser] = useState<UserAccount[]>([]);
  // Get todos
  const {
    todos,
    error: fetchTodoErr,
    isLoading,
    pages,
  } = useFetchTodo({
    shouldRefesh: refresh,
    page: page,
  });
  // Create farm
  const {
    isCreated,
    createTodo,
    error: createTodoErr,
  } = useCreateTodo({
    landId: land.id,
    cropId: crop.id,
  });

  const handleCreateTodo = (todo: Todo | undefined) => {
    createTodo({ todo: todo });
  };

  // Delete
  const { deleteTodo, isDeleted, error: deleteTodoErr } = useDeleteTodo();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    todo: undefined | Todo;
  }>({ open: false, todo: undefined });

  // Cancel Delete close modal, employee = undefined
  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, todo: undefined });
  };

  // Delete customer when submit
  const handleDeleteTodoButton = (todo: Todo) => {
    setShowConfirmDeleteModal({ open: true, todo: todo });
  };

  const handleConfirmDelete = () => {
    deleteTodo({
      todo: showConfirmDeleteModal.todo as Todo,
    });
    setShowConfirmDeleteModal({ open: false, todo: undefined });
  };

  // Update
  const { isUpdated, error: updateTodoErr, updateTodo } = useUpdateTodo();
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    todo: undefined | Todo;
  }>({ open: false, todo: undefined });

  const handleEditTodo = (todo: Todo) => {
    setShowUpdateModal({ open: true, todo: todo });
  };

  const handleUpdateTodo = (todo: Todo | undefined) => {
    updateTodo({ todo: todo });
  };

  useEffect(() => {
    let error = createTodoErr ?? fetchTodoErr ?? deleteTodoErr ?? updateTodoErr;

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
    createTodoErr,
    deleteTodoErr,
    fetchTodoErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateTodoErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Công việc trong ngày"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên công việc",
                searchPlaceholder: "Nhập tên công việc",
                query: query,
                setQuery: setQuery,
              },
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <TodoTable
          todos={todos}
          handleDeleteTodo={handleDeleteTodoButton}
          handleEditTodo={handleEditTodo}
        />

        {!isLoading && (
          <Pagination
            count={pages}
            page={page}
            defaultPage={1}
            variant="outlined"
            color="primary"
            shape="rounded"
            onChange={handlePaginationChange}
            sx={{
              marginTop: {
                lg: "0",
                md: "0",
                sm: "30px",
                xs: "30px",
              },
            }}
          />
        )}

        {/* Create modal */}
        {showModal && (
          <TodoModal
            title="Tạo công việc trong ngày"
            handleCloseModal={() => setShowModal(false)}
            submitButtonLabel="Xác nhận"
            land={land}
            setLand={setLand}
            todo={!isCreated ? undefined : {}}
            crop={crop}
            setCrop={setCrop}
            onSubmit={handleCreateTodo}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <TodoModal
            title="Cập nhật công việc trong ngày"
            handleCloseModal={() =>
              setShowUpdateModal({ open: false, todo: undefined })
            }
            submitButtonLabel="Xác nhận"
            land={showUpdateModal.todo?.land}
            setLand={setLand}
            todo={showUpdateModal.todo}
            crop={showUpdateModal.todo?.crop}
            setCrop={setCrop}
            onSubmit={handleUpdateTodo}
          />
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          title="Xác nhận xóa"
          content={
            <p>
              công việc trong ngày thuộc vùng{" "}
              <span>{showConfirmDeleteModal.todo?.land?.name}</span> sẽ bị xóa
              khỏi hệ thống. <br />
              Bạn có muốn xóa lịch này không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default TodoPage;
