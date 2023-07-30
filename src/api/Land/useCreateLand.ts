import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { LatLngObject } from "../../data/types/Area";
import Land from "../../data/types/Land";

interface CreateAreaParams {
  land: Land;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateLandProps {
  areaId?: string;
  name: string;
  soilTypeId: string;
  locations: LatLngObject[];
  images?: File[];
}

const useCreateLand = (props: useCreateLandProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createLand = useCallback(
    (params: CreateAreaParams) => {
      setCreated(false);
      setError(null);
      setLoading(true);
      const FormData = require("form-data");
      var data = new FormData();
      data.append("name", props.name);
      data.append("soilTypeId", props.soilTypeId);
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

      if (props.images && props.images.length > 0) {
        props.images.forEach((image) => {
          data.append("images", image);
        });
      }

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}land/create?areaId=${props.areaId}`,
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
    [props.name, props.soilTypeId, props.locations, props.images, props.areaId]
  );

  return { isCreated, setCreated, error, isLoading, createLand };
};

export default useCreateLand;
