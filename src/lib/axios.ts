import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://bekasan-api.iyh.me/api/v1/",
});
