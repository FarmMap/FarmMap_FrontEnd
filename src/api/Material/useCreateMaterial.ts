import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import Material from "../../data/types/Material";

interface CreateMaterialParams {
  material: Material | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useCreateMaterialProps {
  name?: string;
  quantity?: number;
  description?: string;
  images?: File[];
  materialGroupId?: string;
}

const useCreateMaterial = (props: useCreateMaterialProps) => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createMaterial = useCallback(
    (params: CreateMaterialParams) => {
      setCreated(false);
      setError(null);

      var data = new FormData();
      setLoading(true);
      data.append("name", props.name ?? "");
      data.append("quantity", props.quantity?.toString() ?? "");
      data.append("description", props.description?.toString() ?? "");
      data.append("materialGroupId", props.materialGroupId ?? "");
      if (props.images && props.images.length > 0) {
        props.images.forEach((image) => {
          data.append("images", image);
        });
      }

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}material`,
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
    },
    [
      props.name,
      props.quantity,
      props.description,
      props.materialGroupId,
      props.images,
    ]
  );

  return { isCreated, setCreated, error, isLoading, createMaterial };
};

export default useCreateMaterial;
