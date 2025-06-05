import axios from "axios";
import config from "../config/config.js";

const playlistBaseRoute = config.playlists;
const baseRoute = config.baseRoute;

class Playlist {
    async createPlaylist({ name, description }) {
        try {
            const response = await axios.post(`${baseRoute}/${playlistBaseRoute}/`,
                {
                    name,
                    description
                },
                {withCredentials: true}
            )
            console.log(response);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getPlaylist({ playlistId }) {
        try {
            const response = await axios.get(`${baseRoute}/${playlistBaseRoute}/${playlistId}`,{withCredentials: true})
            console.log(response);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getUserPlaylists({ userId }) {
        try {
            const response = await axios.get(`${baseRoute}/${playlistBaseRoute}/user/${userId}`,{withCredentials: true})
            console.log(response);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async addVideoToPlaylist({ playlistId, videoId }) {
        try {
            const response = await axios.patch(`${baseRoute}/${playlistBaseRoute}/add/${videoId}/${playlistId}`,{withCredentials: true})
            console.log(response);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async removeVideoFromPlaylist({ playlistId, videoId }) {
        try {
            const response = await axios.patch(`${baseRoute}/${playlistBaseRoute}/remove/${videoId}/${playlistId}`,{withCredentials: true})
            console.log(response);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async updatePlaylist({ playlistId, name, description }) {
        try {
            const response = await axios.patch(`${baseRoute}/${playlistBaseRoute}/${playlistId}`,
                {
                    name,
                    description
                },
                {withCredentials: true}
            )
            console.log(response);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async deletePlaylist({ playlistId }) {
        try {
            const response = await axios.delete(`${playlistBaseRoute}/${playlistId}`,{withCredentials: true})
            console.log(response);
            return response.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

const Playlists = new Playlist();
export default Playlists;