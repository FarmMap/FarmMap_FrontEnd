// External imports
import {
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Delete, Image } from "@mui/icons-material";
import ImageViewer from "react-simple-image-viewer";

// Internal imports
import DefaultModal from "../../components/defaultModal/DefaultModal";
import Plant from "../../../data/types/Plant";
import { toast } from "react-toastify";
import useUpdateImgPlant from "../../../api/Plant/useUpdateImgPlant";
import useDeleteImgPlant from "../../../api/Plant/useDeleteImgPlant";

export interface PlantImageModalProps {
  title: string;
  plant: Plant;
  handleCloseModal: () => void;
  onUploadSuccess: () => void;
}

// ... (other imports)

const PlantImageModal = (props: PlantImageModalProps) => {
  // Map File objects to Blob objects
  const fileBlobs: Blob[] = (props.plant.images || []).map(
    (file) => new Blob([file])
  );

  // Map Blob objects to URL strings
  const fileUrls: string[] = fileBlobs.map((blob) => URL.createObjectURL(blob));

  const [images, setImages] = useState<string[]>(fileUrls);
  const [imageViewer, setImageViewer] = useState<{
    isOpen: boolean;
    index: number;
  }>({ isOpen: false, index: 0 });

  const {
    isCreated,
    images: responseImages,
    error: uploadError,
    isLoading: isUploading,
    uploadPlantImage,
  } = useUpdateImgPlant();
  const {
    isUpdated: isDeleted,
    error: deleteError,
    isLoading: isDeleting,
    deleteImgPlant,
  } = useDeleteImgPlant();

  const handleFileInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let image = event.target.files?.item(0);
    if (image === null || image === undefined) return;

    uploadPlantImage({ plant: props.plant, image: image });
  };

  const handleDeleteImage = (plant: Plant) => deleteImgPlant({ plant: plant });

  const openImageViewer = (index: number) =>
    setImageViewer({ isOpen: true, index: index });
  const closeImageViewer = () => setImageViewer({ isOpen: false, index: 0 });

  useEffect(() => {
    if (isCreated) {
      toast.success("Thêm ảnh thành công!");
      setImages(responseImages);
      props.onUploadSuccess();
    }

    if (isDeleted) {
      toast.success("Xóa ảnh thành công!");
      props.onUploadSuccess();
    }
  }, [isCreated, isDeleted]);

  useEffect(() => {
    let error = uploadError ?? deleteError;
    if (error != null) {
      toast.error(error);
    }
  }, [uploadError, deleteError]);

  return (
    <DefaultModal
      title={props.title}
      onClose={props.handleCloseModal}
      overrideMaxWidth={{
        lg: "1200px",
      }}
    >
      <Grid>
        <ImageList cols={2}>
          {props.plant.images?.map((image, index) => (
            <ImageListItem
              key={index}
              sx={{ height: "100px" }}
              onClick={() => openImageViewer(index)}
            >
              <img
                src={`http://116.118.49.43:8878/${image}`}
                alt={`${image}`}
                loading="lazy"
              />
              <ImageListItemBar
                title={`Ảnh cây ${props.plant.name}`}
                subtitle={props.plant.groupCrop?.name || ""}
                style={{ fontSize: "1.5rem" }}
                sx={{ fontSize: "2.5rem" }}
                actionIcon={
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDeleteImage(props.plant)}
                  >
                    <Delete fontSize="large" />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
          {images.length < 4 && (
            <ImageListItem key={"addimage"}>
              <Button
                sx={{ height: "100%", fontSize: "1.5rem" }}
                variant="outlined"
                component="label"
                disabled={isUploading}
              >
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileInputChanged}
                />
                <Image sx={{ marginRight: "12px" }} fontSize="large" />
                Thêm ảnh
              </Button>
            </ImageListItem>
          )}
        </ImageList>
        {imageViewer.isOpen && (
          <ImageViewer
            src={
              props.plant.images !== undefined
                ? props.plant.images.map(
                    (image) => `http://116.118.49.43:8878/${image}`
                  )
                : []
            }
            currentIndex={imageViewer.index}
            onClose={closeImageViewer}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
            closeOnClickOutside={true}
          />
        )}
      </Grid>
    </DefaultModal>
  );
};

export default PlantImageModal;
