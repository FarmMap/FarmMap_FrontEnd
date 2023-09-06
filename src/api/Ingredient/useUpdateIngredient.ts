import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import Ingredient from "../../data/types/Ingredient";

interface UpdateIngredientParams {
  ingredient: Ingredient | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useUpdateIngredientProps {
  id?: string;
  name?: string;
  quantity?: string;
  weight?: string;
  money?: number;
  information?: string;
  time?: string;
  status?: number;
  images?: File[];
}

const useUpdateIngredient = (props: useUpdateIngredientProps) => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateIngredient = useCallback(
    (params: UpdateIngredientParams) => {
      setUpdated(false);
      setError(null);

      var data = new FormData();
      setLoading(true);
      data.append("name", props.name ?? "");
      data.append("quantity", props.quantity ?? "");
      data.append("weight", props.weight ?? "");
      data.append("money", props.money?.toString() ?? "");
      data.append("information", props.information ?? "");
      data.append("time", props.time ?? "");
      data.append("status", props.status?.toString() ?? "");
      if (props.images && props.images.length > 0) {
        props.images.forEach((image) => {
          data.append("images", image);
        });
      }

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}ingredients/${props.id}`,
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
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
    [
      props.name,
      props.quantity,
      props.weight,
      props.money,
      props.information,
      props.time,
      props.status,
      props.images,
      props.id,
    ]
  );

  return { isUpdated, setUpdated, error, isLoading, updateIngredient };
};

export default useUpdateIngredient;
