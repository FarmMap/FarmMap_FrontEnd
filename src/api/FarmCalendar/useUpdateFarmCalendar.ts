import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import FarmCalendar from "../../data/types/FarmCalendar";

interface UpdateFarmCalendarPrarams {
  farmCalendar: FarmCalendar | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

const useUpdateFarmCalendar = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateFarmCalendar = useCallback(
    (params: UpdateFarmCalendarPrarams) => {
      setUpdated(false);
      setError(null);
      setLoading(true);

      let data = JSON.stringify(params.farmCalendar);

      let config = {
        method: "patch",
        url: `${
          process.env.REACT_APP_API_BASE_URL
        }farming-calender/update?id=${encodeURIComponent(
          `${params.farmCalendar?.id}`
        )}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response: AxiosResponse) => {
          setUpdated(true);
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
    []
  );

  return { isUpdated, error, isLoading, updateFarmCalendar };
};

export default useUpdateFarmCalendar;
