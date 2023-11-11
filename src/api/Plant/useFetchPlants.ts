import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import Plant from "../../data/types/Plant";
import Meta from "../../data/types/Meta";

interface UseFetchPlantProps {
  page?: number;
  query?: string;
  shouldRefesh?: boolean;
}

interface PlantResponse {
  meta: Meta;
  data: Plant[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchPlants = (props: UseFetchPlantProps) => {
  let [plants, setPlant] = useState<Plant[]>([]);
  let [pages, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}crops?order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: PlantResponse = response.data;
        setPlant(data.data);
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

  return { plants, pages, error, isLoading };
};

export default useFetchPlants;
