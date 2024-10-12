import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateArgiProductProps {
  name?: string;
  money?: number;
  quantity?: string;
  weight?: string;
  time?: string;
  images?: File[];
  farm?: any;
}

const useCreateArgiProduct = (props: useCreateArgiProductProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createArgiProduct = useCallback(() => {
    setCreated(false);
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
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}agricultural-products/create`,
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then((response: AxiosResponse) => {
        setCreated(true);
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
  }, [
    props.name,
    props.money,
    props.quantity,
    props.weight,
    props.farm,
    props.time,
    props.images,
  ]);

  return { isCreated, setCreated, error, isLoading, createArgiProduct };
};

export default useCreateArgiProduct;
