import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Area from "../../data/types/Area";

interface CreateAreaParams {
  area: Area;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateAreaProps {
  farmId: string;
}

const useCreateArea = (props: useCreateAreaProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createEmployee = useCallback(
    (params: CreateAreaParams) => {
      setCreated(false);
      setError(null);
      setLoading(true);

      let data = JSON.stringify(params.area);

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}area?farmId=${props.farmId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "application/json",
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
    [props.farmId]
  );

  return { isCreated, setCreated, error, isLoading, createEmployee };
};

export default useCreateArea;
