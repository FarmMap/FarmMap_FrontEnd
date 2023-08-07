import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import FarmCalendar from "../../data/types/FarmCalendar";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchFarmCalendarListProps {
  shouldRefesh?: boolean;
}

const useFetchFarmCalendarList = (props: useFetchFarmCalendarListProps) => {
  let [farmCalendars, setFarmCalendars] = useState<FarmCalendar[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}farming-calender/gets?order=ASC&page=1&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setFarmCalendars(data);

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

  return { farmCalendars, error, isLoading };
};

export default useFetchFarmCalendarList;
