import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Ingredient from "../../data/types/Ingredient";
import Meta from "../../data/types/Meta";

interface UseFetchIngredientProps {
  page?: number;
  query?: string;
  shouldRefesh?: boolean;
}

interface IngredientResponse {
  meta: Meta;
  data: Ingredient[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchIngredients = (props: UseFetchIngredientProps) => {
  let [ingredients, setIngredient] = useState<Ingredient[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}ingredients?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: IngredientResponse = response.data;
        setIngredient(data.data);
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
  }, [props.page, props.shouldRefesh, props.query]);

  return { ingredients, pages, error, isLoading };
};

export default useFetchIngredients;
