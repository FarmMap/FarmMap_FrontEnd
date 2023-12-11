import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import UserAccount from "../../data/types/UserAccount";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchMyAccountProps {
  shouldRefesh?: boolean;
}

const useFetchMyAccount = (props: useFetchMyAccountProps) => {
  let [user, setUser] = useState<UserAccount>({});
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `${process.env.REACT_APP_API_BASE_URL}users/my`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setUser(data);

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

  return { user, error, isLoading };
};

export default useFetchMyAccount;
