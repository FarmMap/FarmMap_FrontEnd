import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

import Plant from "../../data/types/Plant";

interface UpdatePlantPrarams {
  plant: Plant | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

const useUpdatePlant = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updatePlant = useCallback((params: UpdatePlantPrarams) => {
    setUpdated(false);
    setError(null);
    setLoading(true);

    let data = JSON.stringify(params.plant);

    let config = {
      method: "put",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }crops?cropId=${encodeURIComponent(`${params.plant?.id}`)}`,
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
  }, []);

  return { isUpdated, error, isLoading, updatePlant };
};

export default useUpdatePlant;
