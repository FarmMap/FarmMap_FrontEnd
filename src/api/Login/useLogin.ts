import { Result, Left, Right } from "./Result";
import axios, { AxiosError, AxiosResponse } from "axios";
import UserAccount from "../../data/types/UserAccount";
import { log } from "console";
type RequestError = {
  code: string;
  message: string;
};

type LoginSuccess = {
  accessToken: string;
};

class UseLogin {
  async signInWithUsernameAndPassword(
    credentials: UserAccount
  ): Promise<Result<String, String>> {
    try {
      var requestBody = JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      });

      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "auth/login",
        headers: { "Content-Type": "application/json" },
        data: requestBody,
      };

      let response: AxiosResponse = await axios(config);

      let data: LoginSuccess = response.data;

      console.log(data);

      return new Right(data.accessToken);
    } catch (error) {
      return new Left(
        ((error as AxiosError).response?.data as RequestError).message
      );
    }
  }

  async getCurrentUser(token: string): Promise<Result<String, UserAccount>> {
    try {
      let token: string | null = window.localStorage.getItem("token");

      if (token == null) {
        return new Left("Vui lòng đăng nhập");
      }

      var config = {
        method: "GET",
        url:
          process.env.REACT_APP_API_BASE_URL +
          "auth/users?order=ASC&page=1&take=10",
        headers: { Authorization: `Bearer ${token}` },
      };

      let response: AxiosResponse = await axios(config);

      let data: UserAccount = response.data;

      return new Right(data);
    } catch (error) {
      return new Left(
        ((error as AxiosError).response?.data as RequestError).message
      );
    }
  }
}

export default UseLogin;
