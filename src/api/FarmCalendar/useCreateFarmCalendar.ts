import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import FarmCalendar from "../../data/types/FarmCalendar";

interface CreateFarmCalendarParams {
  farmCalendar: FarmCalendar | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateFarmCalendarProps {
  landId?: string;
}

const useCreateFarmCalendar = (props: useCreateFarmCalendarProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createFarmCalendar = useCallback(
    (params: CreateFarmCalendarParams) => {
      setCreated(false);
      setError(null);
      setLoading(true);

      let data = JSON.stringify(params.farmCalendar);

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_BASE_URL}farming-calender/create?landId=${props.landId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response: AxiosResponse) => {
          setCreated(true);
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
    },
    [props.landId]
  );

  return { isCreated, setCreated, error, isLoading, createFarmCalendar };
};

export default useCreateFarmCalendar;
