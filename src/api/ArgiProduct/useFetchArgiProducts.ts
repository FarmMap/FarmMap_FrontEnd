import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import ArgiProduct from "../../data/types/ArgiProduct";
import Meta from "../../data/types/Meta";

interface UseFetchArgiProductProps {
  page?: number;
  query?: string;
  shouldRefesh?: boolean;
}

interface ArgiProductResponse {
  meta: Meta;
  data: ArgiProduct[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchArgiProducts = (props: UseFetchArgiProductProps) => {
  let [argiProducts, setArgiProduct] = useState<ArgiProduct[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}agricultural-products?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: ArgiProductResponse = response.data;
        setArgiProduct(data.data);
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

  return { argiProducts, pages, error, isLoading };
};

export default useFetchArgiProducts;
