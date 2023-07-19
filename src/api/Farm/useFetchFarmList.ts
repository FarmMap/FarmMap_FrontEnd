import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Farm from "../../data/types/Farm";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchFarmListProps {
  shouldRefesh: boolean;
}

const useFetchFarmList = (props: useFetchFarmListProps) => {
  let [farms, setFarms] = useState<Farm[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}farm/all`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setFarms(data);

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
  }, [props.shouldRefesh]);

  return { farms, error, isLoading };
};

export default useFetchFarmList;
