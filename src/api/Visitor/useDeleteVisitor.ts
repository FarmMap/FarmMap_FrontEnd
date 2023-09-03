import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Visitor from "../../data/types/Visitor";

interface DeleteVisitorParams {
  visitor: Visitor;
}

interface ResponseError {
  code: string;
  message: string;
}

const useDeleteVisitor = () => {
  const [isDeleted, setDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const deleteVisitor = useCallback((params: DeleteVisitorParams) => {
    setDeleted(false);
    setError(null);
    setLoading(true);

    let config = {
      method: "delete",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }visitor/delete?id=${encodeURIComponent(`${params.visitor.id}`)}`,
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

  return { isDeleted, error, isLoading, deleteVisitor };
};

export default useDeleteVisitor;
