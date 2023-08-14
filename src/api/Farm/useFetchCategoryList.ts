import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Province from "../../data/types/Province";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchProvinceListProps {
  shouldRefesh?: boolean;
  type: string;
}

const useFetchProvinceList = (props: useFetchProvinceListProps) => {
  let [provinces, setProvinces] = useState<Province[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}categories/getsByCategory?type=${props.type}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setProvinces(data);

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

  return { provinces, error, isLoading };
};

export default useFetchProvinceList;
