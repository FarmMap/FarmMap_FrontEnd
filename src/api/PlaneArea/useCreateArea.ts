import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { Area, LatLngObject } from "../../data/types/Area";

interface CreateAreaParams {
  area: Area;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateAreaProps {
  farmId?: string;
  name: string;
  acreage: number;
  locations: LatLngObject[];
  description: string;
  avatars?: File[];
}

const useCreateArea = (props: useCreateAreaProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createArea = useCallback(
    (params: CreateAreaParams) => {
      setCreated(false);
      setError(null);
      setLoading(true);
      const FormData = require("form-data");
      var data = new FormData();
      data.append("name", props.name);
      data.append("acreage", props.acreage);
      data.append("description", props.description);
      props.locations.forEach((location, i) => {
        data.append(
          "locations",
          JSON.stringify({
            point: location.point,
            latitude: location.latitude,
            longitude: location.longitude,
          })
        );
      });

      if (props.avatars && props.avatars.length > 0) {
        props.avatars.forEach((avatar) => {
          data.append("avatars", avatar);
        });
      }

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}area?farmId=${props.farmId}`,
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
      props.acreage,
      props.avatars,
      props.description,
      props.locations,
      props.name,
      props.farmId,
    ]
  );

  return { isCreated, setCreated, error, isLoading, createArea };
};

export default useCreateArea;
