import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import BillRequest from "../../data/types/BillRequest";

interface CreateBillRequestParams {
  billRequest: BillRequest;
}

interface ResponseError {
  code: string;
  message: string;
}

const useCreateBillRequest = () => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createBillRequest = useCallback((params: CreateBillRequestParams) => {
    setCreated(false);
    setError(null);
    setLoading(true);

    let data = JSON.stringify(params.billRequest);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASE_URL}bill-request/create-bill-request`,
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
  }, []);

  return { isCreated, setCreated, error, isLoading, createBillRequest };
};

export default useCreateBillRequest;
