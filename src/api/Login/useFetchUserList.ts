import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import UserAccount from "../../data/types/UserAccount";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchUserListProps {
  shouldRefesh?: boolean;
}

const useFetchUserList = (props: useFetchUserListProps) => {
  let [users, setUsers] = useState<UserAccount[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}user/gets?order=ASC&page=1take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setUsers(data.data);

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

  return { users, error, isLoading };
};

export default useFetchUserList;
