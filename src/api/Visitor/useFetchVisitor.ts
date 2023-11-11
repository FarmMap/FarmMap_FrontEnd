import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Visitor from "../../data/types/Visitor";
import Meta from "../../data/types/Meta";

interface UseFetchVisitorProps {
  page: number;
  query: string;
  shouldRefesh?: boolean;
}

interface VisitorResponse {
  meta: Meta;
  data: Visitor[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchVisitor = (props: UseFetchVisitorProps) => {
  let [visitors, setVisitor] = useState<Visitor[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}visitor/gets?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: VisitorResponse = response.data;
        setVisitor(data.data);
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

  return { visitors, pages, error, isLoading };
};

export default useFetchVisitor;
