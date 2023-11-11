import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import BillRequest from "../../data/types/BillRequest";

interface DeleteBillRequestParams {
  billRequest: BillRequest;
}

interface ResponseError {
  code: string;
  message: string;
}

const useDeleteBillRequest = () => {
  const [isDeleted, setDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const deleteBillRequest = useCallback((params: DeleteBillRequestParams) => {
    setDeleted(false);
    setError(null);
    setLoading(true);

    let config = {
      method: "delete",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }bill-request/delete?id=${encodeURIComponent(
        `${params.billRequest.id}`
      )}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        setDeleted(true);
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

  return { isDeleted, error, isLoading, deleteBillRequest };
};

export default useDeleteBillRequest;
