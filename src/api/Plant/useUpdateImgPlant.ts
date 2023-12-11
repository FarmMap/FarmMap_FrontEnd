import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import Plant from "../../data/types/Plant";

interface UploadPlantImageProps {
  plant: Plant;
  image: File;
}

interface ResponseError {
  code: string;
  message: string;
}

const useUploadPlantImage = () => {
  const [isCreated, setCreated] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const uploadPlantImage = useCallback((params: UploadPlantImageProps) => {
    setCreated(false);
    setImages([]);
    setError(null);
    setLoading(true);

    let data = new FormData();
    data.append("images", params.image);

    let config = {
      method: "put",
      url: `${process.env.REACT_APP_API_BASE_URL}crops/images/add?cropId=${params.plant.id}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then((response: AxiosResponse) => {
        setImages(response.data);
        setCreated(true);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          let responseError: ResponseError = error.response
            .data as ResponseError;

          setError(responseError.message);
        } else {
          let requestError = error.request;

          setError(requestError);
        }

        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => setCreated(false), 500);
      });
  }, []);

  return { isCreated, images, error, isLoading, uploadPlantImage };
};

export default useUploadPlantImage;
