import React, { Fragment, useEffect, useState } from "react";
// Ex
import { Grid, MenuItem, Pagination, Select } from "@mui/material";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import ArgiProductTable from "./ArgiProductTable";
import { toast } from "react-toastify";
import DefaultModal from "../../components/defaultModal";
import Carousel from "react-material-ui-carousel";

import ArgiProductModal from "./ArgiProductModal";

// Style imports
import classNames from "classnames/bind";
import styles from "./ArgiProduct.module.scss";
import useFetchArgiProducts from "../../../api/ArgiProduct/useFetchArgiProducts";
import ArgiProduct from "../../../data/types/ArgiProduct";
import useDeleteArgiProduct from "../../../api/ArgiProduct/useDeleteArgiProduct";
import useUpdateArgiProduct from "../../../api/ArgiProduct/useUpdateArgiProduct";
import useCreateArgiProduct from "../../../api/ArgiProduct/useCreateArgiProduct";
import KDialog from "../../components/kDialog/KDialog";

const cx = classNames.bind(styles);

const ArgiProductPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [argiProduct, setArgiProducts] = useState<ArgiProduct>({
    name: "",
    weight: "",
    money: 0,
    time: "",
    farm: "",
    quantity: "",
    images: [],
  });

  // handle Pagination
  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
  };

  //
  // Get argiProducts
  const {
    argiProducts,
    error: fetchargiProductsErr,
    isLoading,
    pages,
  } = useFetchArgiProducts({
    shouldRefesh: refresh,
    page: page,
    query: query,
  });

  // Create argiProducts

  const {
    isCreated,
    error: createargiProductErr,
    createArgiProduct,
  } = useCreateArgiProduct({
    name: argiProduct.name,
    money: argiProduct.money,
    quantity: argiProduct.quantity,
    weight: argiProduct.weight,
    time: argiProduct.time,
    farm: argiProduct.farm,
    images: argiProduct.images,
  });
  const handleCreateMaterial = (argiProduct: ArgiProduct | undefined) => {
    createArgiProduct({ argiProduct: argiProduct });
  };
  // Get img
  const [imgArgiProduct, setImgArgiProduct] = useState<{
    open: boolean;
    argiProduct?: ArgiProduct;
  }>({ open: false });

  const handleGetImgArgiProduct = (argiProduct: ArgiProduct) => {
    setImgArgiProduct({ open: true, argiProduct: argiProduct });
  };

  // Delete
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<{
    open: boolean;
    argiProduct: undefined | ArgiProduct;
  }>({ open: false, argiProduct: undefined });

  const {
    deleteArgiProduct,
    error: deleteArgiProductErr,
    isDeleted,
  } = useDeleteArgiProduct();

  const handleDeleteArgiProduct = (argiProduct: ArgiProduct) => {
    setShowConfirmDeleteModal({ open: true, argiProduct: argiProduct });
  };

  const handleCancelDelete = () => {
    setShowConfirmDeleteModal({ open: false, argiProduct: undefined });
  };

  const handleConfirmDelete = () => {
    deleteArgiProduct({
      argiProduct: showConfirmDeleteModal.argiProduct as ArgiProduct,
    });
    setShowConfirmDeleteModal({ open: false, argiProduct: undefined });
  };

  // Edit
  const {
    isUpdated,
    error: updateMaterialErr,
    updateArgiProduct,
  } = useUpdateArgiProduct({
    id: argiProduct.id,
    name: argiProduct.name,
    money: argiProduct.money,
    quantity: argiProduct.quantity,
    weight: argiProduct.weight,
    time: argiProduct.time,
    farm: argiProduct.farm,
    images: argiProduct.images,
  });
  const [showUpdateModal, setShowUpdateModal] = useState<{
    open: boolean;
    argiProduct: ArgiProduct | undefined;
  }>({ open: false, argiProduct: undefined });

  const handleEditArgiProduct = (argiProduct: ArgiProduct) => {
    setShowUpdateModal({ open: true, argiProduct: argiProduct });
    setArgiProducts(argiProduct);
  };

  const handleUpdateMaterial = (argiProduct: ArgiProduct | undefined) => {
    updateArgiProduct({ argiProduct: argiProduct });
  };

  useEffect(() => {
    let error =
      fetchargiProductsErr ??
      createargiProductErr ??
      deleteArgiProductErr ??
      updateMaterialErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || isDeleted || isUpdated) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
      setTimeout(() => {
        setArgiProducts({} as ArgiProduct);
        setShowModal(false);
      }, 3000);
    }
  }, [
    createargiProductErr,
    deleteArgiProductErr,
    fetchargiProductsErr,
    isCreated,
    isDeleted,
    isUpdated,
    updateMaterialErr,
  ]);

  return (
    <DefaultWebLayOut>
      <Grid>
        <DefaultTitleLayOut
          heading="Sản phẩm nông sản"
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
            filters={[
              <Fragment>
                <label htmlFor="select">Nhóm sản phẩm</label>
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
          ></DefaultFilterLayOut>
        </DefaultTitleLayOut>

        <ArgiProductTable
          argiProducts={argiProducts}
          handleGetImgArgiProduct={handleGetImgArgiProduct}
          handleDeleteArgiProduct={handleDeleteArgiProduct}
          handleEditArgiProduct={handleEditArgiProduct}
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
          <ArgiProductModal
            title="Thêm sản phẩm"
            handleCloseModal={() => {
              setShowModal(false);
              setArgiProducts({});
            }}
            submitButtonLabel="Xác nhận"
            argiProduct={argiProduct}
            setArgiProduct={setArgiProducts}
            onSubmit={handleCreateMaterial}
          />
        )}

        {/* Update Modal */}
        {showUpdateModal.open && (
          <ArgiProductModal
            title="Cập nhật sản phẩm"
            handleCloseModal={() => {
              setShowUpdateModal({ open: false, argiProduct: undefined });
              setArgiProducts({});
            }}
            submitButtonLabel="Xác nhận"
            argiProduct={argiProduct}
            setArgiProduct={setArgiProducts}
            onSubmit={handleUpdateMaterial}
          />
        )}

        {/* Img modal */}
        {imgArgiProduct.open && (
          <DefaultModal
            title={`Ảnh ${imgArgiProduct.argiProduct?.name}`}
            onClose={() => {
              setImgArgiProduct({ open: false, argiProduct: undefined });
            }}
          >
            <Carousel>
              {imgArgiProduct.argiProduct?.images?.map((image, i) => (
                <img
                  key={i}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                  src={`http://118.69.126.49:8878/${image}`}
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
              Nhà cung cấp {""}
              <span>{showConfirmDeleteModal.argiProduct?.name}</span> sẽ bị xóa
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

export default ArgiProductPage;
