import axios from "axios";
import config from "../config/config.js";

const dashboardBaseRoute = config.dashboard;

class Dashboard {
    async getChannelStats() {
        try {
            const response = await axios.get(`${dashboardBaseRoute}/stats`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getChannelVideos() {
        try {
            const response = await axios.get(`${dashboardBaseRoute}/videos`);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

const dashboard = new Dashboard();

export default dashboard;