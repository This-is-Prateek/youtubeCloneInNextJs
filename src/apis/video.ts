import axios from "axios";
import config from "../config/config";

const videosBaseRoute = config.videos;
const baseRoute = config.baseRoute;

class Videos {
  async getVideo({ videoId }: { videoId: string }) {
    try {
      const response = await axios.get(`${baseRoute}/${videosBaseRoute}/${videoId}`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllVideos() {
    try {
      const response = await axios.get(`${baseRoute}/${videosBaseRoute}/`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllUserVideos({ page = 1}: { page?:number, limit?:number }) {
    try {
      const response = await axios.get(`${baseRoute}/${videosBaseRoute}/get-user-videos?page=${page}`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getChannelVideos({ channelId, page = 1, limit = 10 }: { channelId: string; page?: number; limit?: number }) {
    console.log('request received');
    
    try {
      const response = await axios.get(`${baseRoute}/${videosBaseRoute}/get-user-videos/${channelId}?page=${page}`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async publishVideo(data: FormData) {
    try {
      const response = await axios.post(`${baseRoute}/${videosBaseRoute}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("response:", response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateVideo({ videoId }: { videoId: string }, data: FormData) {
    try {
      const response = await axios.patch(
        `${baseRoute}/${videosBaseRoute}/${videoId}`,
        data,
        { withCredentials: true }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteVideo({ videoId }: { videoId: string }) {
    try {
      const response = await axios.delete(`${baseRoute}/${videosBaseRoute}/${videoId}`, {
        withCredentials: true,
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async togglePublishStatus({ videoId }: { videoId: string }) {
    try {
      const response = await axios.patch(
        `${baseRoute}/${videosBaseRoute}/toggle-publish/${videoId}`,
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

const videos = new Videos();

export default videos;
