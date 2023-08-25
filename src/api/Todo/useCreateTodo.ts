import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Todo from "../../data/types/Todo";

interface CreateTodoParams {
  todo: Todo | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateTodoProps {
  landId?: string;
  cropId?: string;
}

const useCreateTodo = (props: useCreateTodoProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createTodo = useCallback(
    (params: CreateTodoParams) => {
      setCreated(false);
      setError(null);
      setLoading(true);

      let data = JSON.stringify(params.todo);

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}work-of-day/create?landId=${props.landId}&cropId=${props.cropId}`,
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
    [props.cropId, props.landId]
  );

  return { isCreated, setCreated, error, isLoading, createTodo };
};

export default useCreateTodo;
