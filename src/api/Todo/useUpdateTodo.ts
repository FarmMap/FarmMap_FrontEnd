import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Todo from "../../data/types/Todo";

interface UpdateTodoPrarams {
  todo: Todo | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

const useUpdateTodo = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateTodo = useCallback((params: UpdateTodoPrarams) => {
    setUpdated(false);
    setError(null);
    setLoading(true);

    let data = JSON.stringify(params.todo);

    let config = {
      method: "patch",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }work-of-day/update?id=${encodeURIComponent(`${params.todo?.id}`)}`,
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

  return { isUpdated, error, isLoading, updateTodo };
};

export default useUpdateTodo;
