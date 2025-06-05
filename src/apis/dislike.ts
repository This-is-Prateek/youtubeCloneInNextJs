import axios from "axios";
import config from "../config/config.js";

const dislikeBaseRoute = config.dislikes;

class Dislikes {
    async toggleVideoDislike({ videoId }) {
        try {
            const response = await axios.post(`${dislikeBaseRoute}/toggle/v/${videoId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async toggleCommentDislike({ commentId }) {
        try {
            const response = await axios.post(`${dislikeBaseRoute}/toggle/c/${commentId}`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async toggleTweetDislke({ tweetId }) {
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