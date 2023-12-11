import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import Plant from "../../data/types/Plant";

interface UpdatePlantParams {
  plant: Plant | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useDeleteImgPlantProps {
  id?: string;
  removeImages?: File[];
}

const useDeleteImgPlant = (props: useDeleteImgPlantProps) => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const deleteImgPlant = useCallback(
    (params: UpdatePlantParams) => {
      setUpdated(false);
      setError(null);

      var data = new FormData();

      if (props.removeImages && props.removeImages.length > 0) {
        props.removeImages.forEach((image) => {
          data.append("removeImages", image);
        });
      }

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}crops/images/delete?cropId=${props.id}`,
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      axios(config)
        .then((response: AxiosResponse) => {
          setUpdated(true);
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
        });
    },
    [props.removeImages, props.id]
  );

  return { isUpdated, setUpdated, error, isLoading, deleteImgPlant };
};

export default useDeleteImgPlant;
