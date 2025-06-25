import axios from "axios";
import config from "../config/config.js";

const likeBaseRoute = config.likes;

class Likes {
    async toggleVideoLike({ videoId }: { videoId: string }) {
        try {
            const response = await axios.post(`${likeBaseRoute}/toggle/v/${videoId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async toggleCommentLike({ commentId }: { commentId: string }) {
        try {
            const response = await axios.post(`${likeBaseRoute}/toggle/c/${commentId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async toggleTweetLike({ tweetId }: { tweetId: string }) {
        try {
            const response = await axios.post(`${likeBaseRoute}/toggle/t/${tweetId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getLikedVideos() {
        try {
            const response = await axios.get(`${likeBaseRoute}/videos`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const likes = new Likes();

export default likes;