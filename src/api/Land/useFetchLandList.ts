import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Land from "../../data/types/Land";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchLandListProps {
  shouldRefesh?: boolean;
}

const useFetchLandList = (props: useFetchLandListProps) => {
  let [lands, setLands] = useState<Land[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}land/all`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setLands(data);

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

  return { lands, error, isLoading };
};

export default useFetchLandList;
