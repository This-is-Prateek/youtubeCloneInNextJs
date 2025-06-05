import axios from "axios";
import config from "../config/config";

const usersBaseRoute = config.users;
const baseRoute = config.baseRoute;

class Users {
  async changePassword({ oldPassword, newPassword }) {
    try {
      const response = await axios.post(
        `${baseRoute}/${usersBaseRoute}/change-password`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(
        `${baseRoute}/${usersBaseRoute}/current-user`,
        { withCredentials: true }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAccountDetails({ fullName, email }) {
    try {
      const response = await axios.patch(
        `${baseRoute}/${usersBaseRoute}/update-account`,
        {
          fullName,
          email,
        },
        { withCredentials: true }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserChannelProfile({ userId }) {
    try {
      const response = await axios.get(
        `${baseRoute}/${usersBaseRoute}/c/${userId}`,
        { withCredentials: true }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getWatchHistory() {
    try {
      const response = await axios.get(
        `${baseRoute}/${usersBaseRoute}/history`,
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

const users = new Users();

export default users;
