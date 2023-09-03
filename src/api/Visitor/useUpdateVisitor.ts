import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Visitor from "../../data/types/Visitor";

interface UpdateVisitorPrarams {
  visitor: Visitor;
}

interface ResponseError {
  code: string;
  message: string;
}

const useUpdateVisitor = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateVisitor = useCallback((params: UpdateVisitorPrarams) => {
    setUpdated(false);
    setError(null);
    setLoading(true);

    let data = JSON.stringify(params.visitor);

    let config = {
      method: "patch",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }visitor/update?id=${encodeURIComponent(`${params.visitor.id}`)}`,
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

  return { isUpdated, error, isLoading, updateVisitor };
};

export default useUpdateVisitor;
