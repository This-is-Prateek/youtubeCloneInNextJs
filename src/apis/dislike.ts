import axios from "axios";
import config from "../config/config.js";

const dislikeBaseRoute = config.dislikes;

class Dislikes {
    async toggleVideoDislike({ videoId }: { videoId: string }) {
        try {
            const response = await axios.post(`${dislikeBaseRoute}/toggle/v/${videoId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async toggleCommentDislike({ commentId }: { commentId: string }) {
        try {
            const response = await axios.post(`${dislikeBaseRoute}/toggle/c/${commentId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async toggleTweetDislike({ tweetId }: { tweetId: string }) {
        try {
            const response = await axios.post(`${dislikeBaseRoute}/toggle/t/${tweetId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const dislikes = new Dislikes();

export default dislikes;