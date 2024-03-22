import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://starfish-neutral-coyote.ngrok-free.app/api/v1",
});
