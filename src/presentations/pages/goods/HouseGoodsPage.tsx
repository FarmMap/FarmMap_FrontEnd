import React, { Fragment, useEffect, useState } from "react";
// Ex
import { Grid, MenuItem, Pagination, Select } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import HouseGoodsTable from "./HouseGoodsTable";
import Ingredient from "../../../data/types/Ingredient";
import { toast } from "react-toastify";
import DefaultModal from "../../components/defaultModal";
import Carousel from "react-material-ui-carousel";
import useCreateIngredient from "../../../api/Ingredient/useCreateIngredient";
import Province from "../../../data/types/Province";

import KDialog from "../../components/kDialog/KDialog";
import useFetchIngredients from "../../../api/Ingredient/useFetchIngredient";
import useDeleteIngredient from "../../../api/Ingredient/useDeleteIngredient";
import useUpdateIngredient from "../../../api/Ingredient/useUpdateIngredient";
import HouseGoodsModal from "./HouseGoodsModal";
import useDebounce from "../../../hooks/useDebounce";
// Style imports

import classNames from "classnames/bind";
import styles from "./HouseGoods.module.scss";
const cx = classNames.bind(styles);

const HouseGoodsPage = () => {
  const [query, setQuery] = useState("");
  const ingredientQueryDebounce = useDebounce<string>(query, 700);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ingredient, setIngredient] = useState<Ingredient>({
    status: 0,
  });

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };

  //
  // Get ingredients
  const {
    ingredients,
    error: fetchIngredientsErr,
    isLoading,
    pages,
  } = useFetchIngredients({
    shouldRefesh: refresh,
    page: page,
    query: ingredientQueryDebounce,
  });

  // Create ingredients

  const {
    isCreated,
    error: createingredientErr,
    createIngredient,
  } = useCreateIngredient({
    name: ingredient.name,
    quantity: ingredient.quantity,
    weight: ingredient.weight,
    money: ingredient.money,
    information: ingredient.information,
    time: ingredient.time,
    status: ingredient.status,
    images: ingredient.images,
  });
  const handleCreateIngredient = (ingredient: Ingredient | undefined) => {
    createIngredient({ ingredient: ingredient });
  };
  // Get img
  const [imgIngredient, setImgIngredient] = useState<{
    open: boolean;
    ingredient?: Ingredient;
  }>({ open: false });

  const handleGetImgIngredient = (ingredient: Ingredient) => {
    setImgIngredient({ open: true, ingredient: ingredient });
  };

  // Delete
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    ingredient: undefined | Ingredient;
  }>({ open: false, ingredient: undefined });

  const {
    deleteIngredient,
    error: deleteIngredientErr,
    isDeleted,
  } = useDeleteIngredient();

  const handleDeleteIngredient = (ingredient: Ingredient) => {
    setShowConfirmDeleteModal({ open: true, ingredient: ingredient });
  };

  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, ingredient: undefined });
  };

  const handleConfirmDelete = () => {
    deleteIngredient({
      ingredient: showConfirmDeleteModal.ingredient as Ingredient,
    });
    setShowConfirmDeleteModal({ open: false, ingredient: undefined });
  };

  // Edit
  const {
    isUpdated,
    error: updateIngredientErr,
    updateIngredient,
  } = useUpdateIngredient({
    id: ingredient.id,
    name: ingredient.name,
    quantity: ingredient.quantity,
    weight: ingredient.weight,
    money: ingredient.money,
    information: ingredient.information,
    time: ingredient.time,
    status: ingredient.status,
    images: ingredient.images,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    ingredient: Ingredient | undefined;
  }>({ open: false, ingredient: undefined });

  const handleEditIngredient = (ingredient: Ingredient) => {
    setShowUpdateModal({ open: true, ingredient: ingredient });
    setIngredient(ingredient);
  };

  const handleUpdateIngredient = (ingredient: Ingredient | undefined) => {
    updateIngredient({ ingredient: ingredient });
  };

  useEffect(() => {
    let error =
      fetchIngredientsErr ??
      createingredientErr ??
      deleteIngredientErr ??
      updateIngredientErr;
    // updateIngredientErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted || isUpdated) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setIngredient({} as Ingredient);
        setShowModal(false);
      }, 3000);
    }
  }, [
    createingredientErr,
    deleteIngredientErr,
    fetchIngredientsErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateIngredientErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="hàng hóa"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên hàng hóa",
                searchPlaceholder: "Nhập tên hàng hóa",
                query: query,
                setQuery: setQuery,
              },
              {
                searchLabel: "Số lượng",
                searchPlaceholder: "Nhập số lượng",
                query: query,
                setQuery: setQuery,
              },
            ]}
            filters={[
              <Fragment>
                <label htmlFor="select">Vùng sản xuất</label>
                <Select
                  className={cx("filter-dropdown")}
                  sx={{
                    fontSize: "1.2rem",
                    boxShadow: "none",
                    minWidth: "150px",
                  }}
                  value={""}
                  displayEmpty
                  onChange={() => {}}
                >
                  <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                    Tất cả
                  </MenuItem>
                </Select>
              </Fragment>,
              <Fragment>
              <label htmlFor="select">Trạng thái</label>
              <Select
                className={cx("filter-dropdown")}
                sx={{
                  fontSize: "1.2rem",
                  boxShadow: "none",
                  minWidth: "150px",
                }}
                value={""}
                displayEmpty
                onChange={() => {}}
              >
                <MenuItem sx={{ fontSize: "1.2rem" }} value="">
                  Tất cả
                </MenuItem>
              </Select>
            </Fragment>,
            ]}
            onSearchSubmit={() => {}}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <HouseGoodsTable
          ingredients={ingredients}
          handleGetImgIngredient={handleGetImgIngredient}
          handleDeleteIngredient={handleDeleteIngredient}
          handleEditIngredient={handleEditIngredient}
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
          <HouseGoodsModal
            title="Thêm hàng hóa"
            handleCloseModal={() => {
              setShowModal(false);
              setIngredient({});
            }}
            submitButtonLabel="Xác nhận"
            ingredient={ingredient}
            setIngredient={setIngredient}
            onSubmit={handleCreateIngredient}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <HouseGoodsModal
            title="Cập nhật hàng hóa"
            handleCloseModal={() => {
              setShowUpdateModal({ open: false, ingredient: undefined });
              setIngredient({});
            }}
            submitButtonLabel="Xác nhận"
            ingredient={ingredient}
            setIngredient={setIngredient}
            onSubmit={handleUpdateIngredient}
          />
        )}

        {/* Img modal */}
        {imgIngredient.open && (
          <DefaultModal
            title={`Ảnh ${imgIngredient.ingredient?.name}`}
            onClose={() => {
              setImgIngredient({ open: false, ingredient: undefined });
            }}
          >
            <Carousel>
              {imgIngredient.ingredient?.images?.map((image, i) => (
                <img
                  key={i}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                  src={`http://116.118.49.43:8878/${image}`}
                  alt="FITPRO Farm"
                />
              ))}
            </Carousel>
          </DefaultModal>
        )}

        {/* Confirm delete modal */}
        <KDialog
          open={showConfirmDeleteModal.open}
          title="Xác nhận xóa"
          bckColor="var(--second-color)"
          content={
            <p>
              Sản phẩm {""}
              <span>{showConfirmDeleteModal.ingredient?.name}</span> sẽ bị xóa
              khỏi hệ thống. <br />
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

export default HouseGoodsPage;
