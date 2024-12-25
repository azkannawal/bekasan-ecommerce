import { axiosInstance } from "@/lib/axios";
import getError from "./getError";

const getUserData = async (callback: any) => {
  try {
    const res = await axiosInstance.get("auth/my-data");
    callback(res.data.data);
  } catch (err: any) {
    getError(err);
  }
};

export default getUserData;
