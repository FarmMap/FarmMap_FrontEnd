import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Farm from "../../data/types/Farm";
import Meta from "../../data/types/Meta";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchFarmListProps {
  shouldRefesh?: boolean;
  page: number;
}

interface ProvidorResponse {
  meta: Meta;
  data: Farm[];
}

const useFetchFarmList = (props: useFetchFarmListProps) => {
  let [farms, setFarms] = useState<Farm[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}farm/all?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: ProvidorResponse = response.data;
        setFarms(data.data);
        setPages(data.meta.pageCount ?? 0);

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

  return { farms, error, isLoading };
};

export default useFetchFarmList;
