import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import BillRequest from "../../data/types/BillRequest";

interface UpdateBillRequestPrarams {
  billRequest: BillRequest;
}

interface ResponseError {
  code: string;
  message: string;
}

const useUpdateBillRequest = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateBillRequest = useCallback((params: UpdateBillRequestPrarams) => {
    setUpdated(false);
    setError(null);
    setLoading(true);

    let data = JSON.stringify(params.billRequest);

    let config = {
      method: "put",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }bill-request/update?id=${encodeURIComponent(
        `${params.billRequest.id}`
      )}`,
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

  return { isUpdated, error, isLoading, updateBillRequest };
};

export default useUpdateBillRequest;
