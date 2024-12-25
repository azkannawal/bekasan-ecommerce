import { axiosInstance } from "@/lib/axios";

const getCategory = async (callback: any) => {
  try {
    const response = await axiosInstance.get("product/homepage");
    callback(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

export default getCategory;
