import { business_models } from "./../../presentations/pages/company/LocalDataCompany";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Farm from "../../data/types/Farm";

interface CreateAreaParams {
  farm: Farm;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateFarmProps {
  name: string;
  business_model: string;
  business_type: string;
  province: string;
  district: string;
  wards: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  image?: File;
}

const useCreateFarm = (props: useCreateFarmProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createFarm = useCallback(
    (params: CreateAreaParams) => {
      setCreated(false);
      setError(null);
      setLoading(true);
      const FormData = require("form-data");
      var data = new FormData();
      data.append("business_model", props.business_model);
      data.append("name", props.name);
      data.append("district", props.district);
      data.append("province", props.district);
      data.append("address", props.address);
      data.append(
        "location",
        `{"latitude":${props.location.latitude} ,"longitude": ${props.location.longitude}\n}`
      );
      data.append("wards", props.wards);
      data.append("business_type", props.business_type);
      data.append("image", props.image, props.image?.name);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}farm/create-farm`,
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

            setError(responseError.message[0]);
          } else {
            let requestError = error.request;

            setError(requestError);
          }

          setLoading(false);
        });
    },
    [
      props.address,
      props.business_model,
      props.business_type,
      props.district,
      props.image,
      props.location.latitude,
      props.location.longitude,
      props.name,
      props.wards,
    ]
  );

  return { isCreated, setCreated, error, isLoading, createFarm };
};

export default useCreateFarm;
