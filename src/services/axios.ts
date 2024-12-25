import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
const { accessToken } = useContext(AuthContext);

const AxiosInstance = () => {
  const res = axios.create({
    baseURL: "https://bekasan-api.iyh.me/api/v1",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};

export default AxiosInstance;
