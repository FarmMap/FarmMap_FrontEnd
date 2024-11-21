import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import UserAccount from "../../data/types/UserAccount";
import UseLogin from "./useLogin";
import { Right, Left } from "./Result";

type RequestError = {
  code: string;
  message: string;
};

function useAuth() {
  const [user, setUser] = useState<UserAccount | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<String | undefined>(
    undefined
  );
  const token: string | null = window.localStorage.getItem("token");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loginService = new UseLogin(); // Create instance of UseLogin

  useEffect(() => {
    const fetchUser = async (currentToken: string) => {
      var config = {
        method: "GET",
        url: `${process.env.REACT_APP_API_BASE_URL}users?order=ASC&page=1&take=10`,
        headers: { Authorization: `Bearer ${currentToken}` },
      };

      try {
        let response: AxiosResponse = await axios(config);
        let user: UserAccount = response.data;
        setUser(user);
      } catch (error: unknown) {
        // Check if the error is an AxiosError
        if (axios.isAxiosError(error)) {
          // If token is invalid or expired, try to refresh it
          if (error.response?.status === 401) {
            const refreshResult = await loginService.refreshToken();

            // Check if the result is a Right (success)
            if (refreshResult instanceof Right) {
              const newToken = refreshResult.value.accessToken;
              window.localStorage.setItem("token", newToken);
              fetchUser(newToken); // Retry with new token
            }
            // Check if the result is a Left (failure)
            else if (refreshResult instanceof Left) {
              setErrorMessage(refreshResult.value); // Set the error message from the Left value
            }
          } else {
            // Handle other Axios errors
            setErrorMessage((error.response?.data as RequestError).message);
          }
        } else {
          // Handle non-Axios errors
          setErrorMessage("An unknown error occurred");
        }
        setUser(undefined);
      }
    };

    if (token == null) {
      setUser(undefined);
      setErrorMessage("Cần đăng nhập trước mới có thể vào trang này");
    } else {
      fetchUser(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return [user, errorMessage];
}

export default useAuth;
