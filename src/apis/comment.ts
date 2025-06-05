import axios from "axios";
import config from "../config/config.js";

const commentBaseRoute = config.comments;
const baseRoute = config.baseRoute;

class Comments {
  async addComment({ content, videoId }) {
    try {
      const response = await axios.post(
        `${baseRoute}/${commentBaseRoute}/${videoId}`,
        { content },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getComments({ videoId }) {
    try {
      const response = await axios.get(
        `${baseRoute}/${commentBaseRoute}/${videoId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data.data.comments;
    } catch (error) {
      console.error(error);
    }
  }

  async updateComment({ commentId, content }) {
    try {
      const response = await axios.patch(
        `${baseRoute}/${commentBaseRoute}/c/${commentId}`,
        { content },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteComment({ commentId }) {
    try {
      const response = await axios.delete(
        `${baseRoute}/${commentBaseRoute}/c/${commentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const comments = new Comments();

export default comments;
