import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import BillRequest from "../../data/types/BillRequest";
import Meta from "../../data/types/Meta";

interface UseFetchBillRequestProps {
  page: number;
  query: string;
  shouldRefesh?: boolean;
}

interface BillRequestResponse {
  meta: Meta;
  data: BillRequest[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchBillRequest = (props: UseFetchBillRequestProps) => {
  let [billRequests, setBillRequest] = useState<BillRequest[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}bill-request/gets?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: BillRequestResponse = response.data;
        setBillRequest(data.data);
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

  return { billRequests, pages, error, isLoading };
};

export default useFetchBillRequest;
