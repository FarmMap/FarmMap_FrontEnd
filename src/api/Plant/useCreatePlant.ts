import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import Plant from "../../data/types/Plant";

interface CreatePlantParams {
  plant: Plant | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreatePlantProps {
  name: string;
  disease: string;
  growth: string;
  use: string;
  harvest: string;
  price: number;
  images?: File[];
  groupCrop: any | string;
}

const useCreatePlant = (props: useCreatePlantProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createPlant = useCallback(
    (params: CreatePlantParams) => {
      setCreated(false);
      setError(null);
      var FormData = require("form-data");
      var data = new FormData();
      setLoading(true);
      data.append("name", props.name);
      data.append("disease ", props.disease);
      data.append("growth ", props.growth);
      data.append("use  ", props.use);
      data.append("harvest  ", props.harvest);
      data.append("price  ", props.price);
      data.append("groupCrop  ", props.groupCrop);
      if (props.images && props.images.length > 0) {
        props.images.forEach((image) => {
          data.append("images", image);
        });
      }

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}crops`,
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      axios(config)
        .then((response: AxiosResponse) => {
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
        });
    },
    [
      props.name,
      props.disease,
      props.growth,
      props.use,
      props.harvest,
      props.price,
      props.groupCrop,
      props.images,
    ]
  );

  return { isCreated, setCreated, error, isLoading, createPlant };
};

export default useCreatePlant;
