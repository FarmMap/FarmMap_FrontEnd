import { Result, Left, Right } from "./Result";
import axios, { AxiosError, AxiosResponse } from "axios";
import UserAccount from "../../data/types/UserAccount";

type RequestError = {
  code: string;
  message: string;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

class UseLogin {
  async signInWithUsernameAndPassword(
    credentials: UserAccount
  ): Promise<Result<String, UserAccount>> {
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

      let data: UserAccount = response.data;

      return new Right(data);
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
          "user/gets?order=ASC&page=1&take=10",
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

  // Hàm mới để refresh token
  async refreshToken(): Promise<Result<String, RefreshTokenResponse>> {
    try {
      let refreshToken: string | null =
        window.localStorage.getItem("refreshToken");

      if (refreshToken == null) {
        return new Left("Không có refresh token, vui lòng đăng nhập lại");
      }

      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "auth/refresh-token",
        headers: { "Content-Type": "application/json" },
        data: { refreshToken: refreshToken },
      };

      let response: AxiosResponse = await axios(config);

      let data: RefreshTokenResponse = response.data;

      // Lưu lại token mới vào localStorage
      window.localStorage.setItem("token", data.accessToken);

      return new Right(data);
    } catch (error) {
      return new Left(
        ((error as AxiosError).response?.data as RequestError).message
      );
    }
  }
}

export default UseLogin;
