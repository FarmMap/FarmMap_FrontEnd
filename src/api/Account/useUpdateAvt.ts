import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import UserAccount from "../../data/types/UserAccount";

interface UpdateUserAccountParams {
  userByField: UserAccount | undefined;
}

interface ResponseError {
  code: string;
  message: string;
}

interface useUpdateUserAvtProps {
  avatar?: File;
}

const useUpdateUserAvt = (props: useUpdateUserAvtProps) => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateUserAvt = useCallback(
    (params: UpdateUserAccountParams) => {
      setUpdated(false);
      setError(null);

      var data = new FormData();
      setLoading(true);

      // Check if avatar is defined before appending to FormData
      if (props.avatar) {
        data.append("avatar", props.avatar, props.avatar?.name);
      }

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}users`,
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
    [props.avatar]
  );

  return { isUpdated, setUpdated, error, isLoading, updateUserAvt };
};

export default useUpdateUserAvt;
