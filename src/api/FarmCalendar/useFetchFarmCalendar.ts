import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import FarmCalendar from "../../data/types/FarmCalendar";
import Meta from "../../data/types/Meta";

interface UseFetchFarmCalendarProps {
  page: number;
  query: string;
  shouldRefesh?: boolean;
}

interface FarmCalendarResponse {
  meta: Meta;
  data: FarmCalendar[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchFarmCalendar = (props: UseFetchFarmCalendarProps) => {
  let [farmCalendars, setFarmCalendar] = useState<FarmCalendar[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}farming-calender/gets?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: FarmCalendarResponse = response.data;
        setFarmCalendar(data.data);
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

  return { farmCalendars, pages, error, isLoading };
};

export default useFetchFarmCalendar;
