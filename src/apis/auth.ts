import axios from "axios";
import config from "../config/config";

const users = config.users;
const baseRoute = config.baseRoute;

interface CreateAccountParams {
  fullName: string;
  email: string;
  userName: string;
  password: string;
}

interface LoginParams {
  email?: string | null;
  userName?: string | null;
  password: string;
}

interface User {
  _id: string;
  userName: string;
  email: string;
  fullName: string;
  avatar: string | null;
  coverImage: string | null;
  watchHistory: string[];
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface LogoutResponse {
  message: string;
}

class Auth {
  async createAccount({
    fullName,
    email,
    userName,
    password,
  }: CreateAccountParams): Promise<User> {
    try {
      const response = await axios.post(
        `${baseRoute}/${users}/register`,
        {
          fullName,
          email,
          userName,
          password,
        },
        { withCredentials: true }
      );

      console.log(response);
      await this.login({ email, password });
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({
    email = null,
    userName = null,
    password,
  }: LoginParams): Promise<LoginResponse> {
    try {
      let response;
      console.log(config);

      if (email) {
        response = await axios.post(
          `${baseRoute}/${users}/login`,
          { email, password },
          { withCredentials: true }
        );
        console.log("login response", response);
      } else if (userName) {
        response = await axios.post(
          `${baseRoute}/${users}/login`,
          { userName, password },
          { withCredentials: true }
        );
        console.log("login response", response);
      } else {
        throw new Error("Email or username must be provided");
      }

      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const response = await axios.post(
        `${baseRoute}/${users}/logout`,
        {},
        { withCredentials: true }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const auth = new Auth();

export default auth;
