import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Providor from "../../data/types/Providor";
import Meta from "../../data/types/Meta";

interface UseFetchProvidorProps {
  page: number;
  query: string;
  shouldRefesh?: boolean;
  filter?: string;
}

interface ProvidorResponse {
  meta: Meta;
  data: Providor[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchProvidor = (props: UseFetchProvidorProps) => {
  let [providors, setProvidor] = useState<Providor[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: !props.filter
        ? `${process.env.REACT_APP_API_BASE_URL}persons?order=ASC&page=${props.page}&take=10&search=${props.query}`
        : `${process.env.REACT_APP_API_BASE_URL}persons/getsByType?type=${props.filter}&order=ASC&page=${props.page}&take=10&search=${props.query}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: ProvidorResponse = response.data;
        setProvidor(data.data);
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
  }, [props.page, props.shouldRefesh, props.query, props.filter]);

  return { providors, pages, error, isLoading };
};

export default useFetchProvidor;
