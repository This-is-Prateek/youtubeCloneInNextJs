import axios from "axios";
import config from "../config/config.js";

const subscriptionBaseRoute = config.subscriptions;
const baseRoute = config.baseRoute;

class Subscriptions {
  async toggleSubscription({ channelId }) {
    try {
      const response = await axios.post(
        `${baseRoute}/${subscriptionBaseRoute}/c/${channelId}`,
        {},
        { withCredentials: true }
      );
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }

  async getSubscriptions({ subscriberId }) {
    try {
      const response = await axios.get(
        `${baseRoute}/${subscriptionBaseRoute}/u/${subscriberId}`,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }

  async getSubscribers({ channelId }) {
    try {
      const response = await axios.get(
        `${baseRoute}/${subscriptionBaseRoute}/c/${channelId}`,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (err) {
      throw err;
    }
  }
}

const subscriptions = new Subscriptions();

export default subscriptions;
