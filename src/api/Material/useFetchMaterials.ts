import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Material from "../../data/types/Material";
import Meta from "../../data/types/Meta";

interface UseFetchMaterialProps {
  page?: number;
  query?: string;
  shouldRefesh?: boolean;
}

interface MaterialResponse {
  meta: Meta;
  data: Material[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchMaterials = (props: UseFetchMaterialProps) => {
  let [materials, setMaterial] = useState<Material[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}material?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: MaterialResponse = response.data;
        setMaterial(data.data);
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

  return { materials, pages, error, isLoading };
};

export default useFetchMaterials;
