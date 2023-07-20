import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { Area } from "../../data/types/Area";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchAreaListProps {
  shouldRefesh?: boolean;
}

const useFetchAreaList = (props: useFetchAreaListProps) => {
  let [areas, setAreas] = useState<Area[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}area/all`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setAreas(data);

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

  return { areas, error, isLoading };
};

export default useFetchAreaList;
