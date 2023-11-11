import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Providor from "../../data/types/Providor";

interface CreateProvidorParams {
  providor: Providor;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateProvidorProps {
  type: string;
}

const useCreateProvidor = (props: useCreateProvidorProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createProvidor = useCallback(
    (params: CreateProvidorParams) => {
      setCreated(false);
      setError(null);
      setLoading(true);

      let data = JSON.stringify(params.providor);

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}persons?type=${props.type}`,
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
    [props.type]
  );

  return { isCreated, setCreated, error, isLoading, createProvidor };
};

export default useCreateProvidor;
