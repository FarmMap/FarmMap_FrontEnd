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

interface useUpdateUserAccountProps {
  id?: string;
  fullName?: string;
  jobTitle?: string;
  description?: string;
  avatar?: File;
  email?: string;
  phoneNumber?: string;
  homeTown?: string;
  address?: string;
}

const useUpdateUserAccount = (props: useUpdateUserAccountProps) => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const updateUserAccount = useCallback(
    (params: UpdateUserAccountParams) => {
      setUpdated(false);
      setError(null);

      var data = new FormData();
      setLoading(true);
      data.append("fullName", props.fullName ?? "");
      data.append("jobTitle", props.jobTitle ?? "");
      data.append("description", props.description ?? "");
      data.append("email", props.email ?? "");
      data.append("phoneNumber", props.phoneNumber ?? "");
      data.append("homeTown", props.homeTown ?? "");
      data.append("address", props.address ?? "");

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
    [
      props.fullName,
      props.jobTitle,
      props.description,
      props.email,
      props.phoneNumber,
      props.homeTown,
      props.address,
      props.avatar,
    ]
  );

  return { isUpdated, setUpdated, error, isLoading, updateUserAccount };
};

export default useUpdateUserAccount;
