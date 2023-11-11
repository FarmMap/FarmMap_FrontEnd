import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import ProductType from "../../data/types/ProductType";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchProductTypeProps {
  shouldRefesh?: boolean;
}

const useFetchProductType = (props: useFetchProductTypeProps) => {
  let [productTypes, setProductTypes] = useState<ProductType[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}categories/getsByCategory?type=PRODUCT_TYPE`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setProductTypes(data);

        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          let responseError: ResponseError = error.response
            .data as ResponseError;

          setError(responseError.message[0]);
        } else {
          let requestError = error.request;

          setError(requestError);
        }
        setLoading(false);
      });
  }, [props.shouldRefesh]);

  return { productTypes, error, isLoading };
};

export default useFetchProductType;
