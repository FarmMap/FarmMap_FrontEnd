import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import ArgiProduct from "../../data/types/ArgiProduct";

interface UpdateArgiProductParams {
  argiProduct: ArgiProduct | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useUpdateArgiProductProps {
  id?: string;
  name?: string;
  money?: number;
  quantity?: string;
  weight?: string;
  time?: string;
  images?: File[];
  farm?: string;
}

const useUpdateArgiProduct = (props: useUpdateArgiProductProps) => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateArgiProduct = useCallback(
    (params: UpdateArgiProductParams) => {
      setUpdated(false);
      setError(null);

      var data = new FormData();
      setLoading(true);
      data.append("name", props.name ?? "");
      data.append("money", props.money?.toString() ?? "");
      data.append("quantity", props.quantity ?? "");
      data.append("weight", props.weight ?? "");
      data.append("farm", props.farm ?? "");
      data.append("time", props.time ?? "");
      if (props.images && props.images.length > 0) {
        props.images.forEach((image) => {
          data.append("images", image);
        });
      }

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}agricultural-products/${props.id}`,
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
      props.money,
      props.quantity,
      props.weight,
      props.farm,
      props.time,
      props.images,
      props.id,
    ]
  );

  return { isUpdated, setUpdated, error, isLoading, updateArgiProduct };
};

export default useUpdateArgiProduct;
