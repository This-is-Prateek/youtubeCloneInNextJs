import axios from "axios";
import config from "../config/config";

const healthcheckBaseRoute = config.healthcheck

class Healthcheck {
    async healthcheck() {
        try {
            const response = await axios.get(`${healthcheckBaseRoute}/`)
            console.log(response.data.data);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

const healthcheck = new Healthcheck()

export default healthcheck