import React, { useEffect, useState } from "react";
// Ex
import { Grid, Pagination } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import FarmCalendarTable from "./IngredientTable";
import Material from "../../../data/types/Material";
import { toast } from "react-toastify";
import DefaultModal from "../../components/defaultModal";
import Carousel from "react-material-ui-carousel";
import useCreateMaterial from "../../../api/Material/useCreateMaterial";
import Province from "../../../data/types/Province";
import MaterialModal from "./IngredientModal";

import KDialog from "../../components/kDialog/KDialog";
import useUpdateMaterial from "../../../api/Material/useUpdateMaterial";
import useFetchIngredients from "../../../api/Ingredient/useFetchIngredient";
import Ingredient from "../../../data/types/Ingredient";
import useDeleteIngredient from "../../../api/Ingredient/useDeleteIngredient";
import useCreateIngredient from "../../../api/Ingredient/useCreateIngredient";
// Style imports

const IngredientPage = () => {
  const [query, setQuery] = useState("");
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
    query: query,
  });

  // Create ingredients
  const [crop, setCrop] = useState<Province>({
    name: "",
  });
  const {
    isCreated,
    error: creatematerialErr,
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
  // const {
  //   isUpdated,
  //   error: updateMaterialErr,
  //   updateMaterial,
  // } = useUpdateMaterial({
  //   id: material.id,
  //   name: material.name,
  //   quantity: material.quantity,
  //   description: material.description,
  //   images: material.images,
  //   materialGroupId: material.materialGroupId,
  // });
  // const [showUpdateModal, setShowUpdateModal] = useState<{
  //   open: boolean;
  //   material: Material | undefined;
  // }>({ open: false, material: undefined });

  // const handleEditMaterial = (material: Material) => {
  //   setShowUpdateModal({ open: true, material: material });
  //   setIngredient(material);
  // };

  // const handleUpdateMaterial = (material: Material | undefined) => {
  //   updateMaterial({ material: material });
  // };

  useEffect(() => {
    let error = fetchIngredientsErr ?? creatematerialErr ?? deleteIngredientErr;
    // updateMaterialErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setIngredient({} as Ingredient);
        setCrop({ name: "", id: "" });
        setShowModal(false);
      }, 3000);
    }
  }, [
    creatematerialErr,
    deleteIngredientErr,
    fetchIngredientsErr,
    isCreated,
    isDeleted,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="nguyên liệu"
          handleAddButtonClick={() => {
            setShowModal(true);
          }}
        >
          <DefaultFilterLayOut
            searchs={[
              {
                searchLabel: "Tên nguyên liệu",
                searchPlaceholder: "Nhập tên nguyên liệu",
                query: query,
                setQuery: setQuery,
              },
            ]}
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <FarmCalendarTable
          ingredients={ingredients}
          handleGetImgIngredient={handleGetImgIngredient}
          handleDeleteIngredient={handleDeleteIngredient}
          // handleEditIngredient={handleEditMaterial}
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
          <MaterialModal
            title="Thêm nguyên liệu"
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
        {/* {showUpdateModal.open && (
          <MaterialModal
            title="Cập nhật nguyên liệu"
            handleCloseModal={() => {
              setShowUpdateModal({ open: false, material: undefined });
              setIngredient({});
            }}
            submitButtonLabel="Xác nhận"
            material={material}
            setMaterial={setIngredient}
            onSubmit={handleUpdateMaterial}
          />
        )} */}

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
          bckColor="var(--blue-hover-color)"
          content={
            <p>
              Nhà cung cấp {""}
              <span>{showConfirmDeleteModal.ingredient?.name}</span> sẽ bị xóa
              khỏi hệ thống. <br />
              Bạn có muốn xóa nhà cung cấp này không?
            </p>
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Grid>
    </DefaultWebLayOut>
  );
};

export default IngredientPage;
