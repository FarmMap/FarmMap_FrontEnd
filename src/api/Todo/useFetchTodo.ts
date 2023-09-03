import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Todo from "../../data/types/Todo";
import Meta from "../../data/types/Meta";

interface UseFetchTodoProps {
  page: number;

  shouldRefesh?: boolean;
  filter?: string;
}

interface TodoResponse {
  meta: Meta;
  data: Todo[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchTodo = (props: UseFetchTodoProps) => {
  let [todos, setTodo] = useState<Todo[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}work-of-day/gets?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: TodoResponse = response.data;
        setTodo(data.data);
        setPages(data.meta.pageCount ?? 0);
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
  }, [props.page, props.shouldRefesh, props.filter]);

  return { todos, pages, error, isLoading };
};

export default useFetchTodo;
