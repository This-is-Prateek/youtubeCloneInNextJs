import axios from "axios";
import config from "../config/config.js";

const tweetBaseRoute = config.tweets;
const baseRoute = config.baseRoute;

class Tweets {
    async createTweet({ content }: { content: string }) {
        try {
            const response = await axios.post(`${baseRoute}/${tweetBaseRoute}/`, { content },{ withCredentials: true });
            console.log(response);
            return response.data.data;
        } catch (err) {
            console.error(err);
        }
    }

    async getTweet({ id }: { id: string }) {
        try {
            const response = await axios.get(`${baseRoute}/${tweetBaseRoute}/user/${id}`,{ withCredentials: true });
            console.log(response);
            return response.data.data;
        } catch (err) {
            console.error(err);
        }
    }

    async updateTweet({ id, content }: { id: string; content: string }) {
        try {
            const response = await axios.put(`${baseRoute}/${tweetBaseRoute}/${id}`, { content },{ withCredentials: true });
            console.log(response);
            return response.data.data;
        } catch (err) {
            console.error(err);
        }
    }

    async deleteTweet({ id }: { id: string }) {
        try {
            const response = await axios.delete(`${baseRoute}/${tweetBaseRoute}/${id}`,{ withCredentials: true });
            console.log(response);
            return response.data.data;
        } catch (err) {
            console.error(err);
        }
    }
}

const tweets = new Tweets();

export default tweets;