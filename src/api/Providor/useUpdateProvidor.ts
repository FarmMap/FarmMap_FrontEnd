import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Providor from "../../data/types/Providor";

interface UpdateProvidorPrarams {
  providor: Providor;
}

interface ResponseError {
  code: string;
  message: string;
}

const useUpdateProvidor = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateProvidor = useCallback((params: UpdateProvidorPrarams) => {
    setUpdated(false);
    setError(null);
    setLoading(true);

    let data = JSON.stringify(params.providor);

    let config = {
      method: "patch",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }persons/update?id=${encodeURIComponent(`${params.providor.id}`)}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
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
  }, []);

  return { isUpdated, error, isLoading, updateProvidor };
};

export default useUpdateProvidor;
