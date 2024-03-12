import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://seahorse-cool-kodiak.ngrok-free.app/api/v1/",
});
