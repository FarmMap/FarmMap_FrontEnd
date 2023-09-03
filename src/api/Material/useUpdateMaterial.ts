import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import Material from "../../data/types/Material";

interface UpdateMaterialParams {
  material: Material | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useUpdateMaterialProps {
  name?: string;
  quantity?: number;
  description?: string;
  images?: File[];
  materialGroupId?: string;
}

const useUpdateMaterial = (props: useUpdateMaterialProps) => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateMaterial = useCallback(
    (params: UpdateMaterialParams) => {
      setUpdated(false);
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
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}material/update?id=3583d952-340f-4f8b-bcf1-59eea6b03bb0`,
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
      props.description,
      props.materialGroupId,
      props.images,
    ]
  );

  return { isUpdated, setUpdated, error, isLoading, updateMaterial };
};

export default useUpdateMaterial;
