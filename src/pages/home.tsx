import Landing from "./../components/fragments/Landing";
import CardProduct from "../components/fragments/CardProduct";
import Navbar from "./../components/fragments/Navbar";
import { useAuth } from "@/context/LoginContext";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

const Home = () => {
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: accessToken,
        },
      };
      try {
        const response = await axiosInstance.get("/auth/my-data", config);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [accessToken]);

  const verify = false;
  return (
    <div className="relative">
      {!verify ? <Landing /> : null}
      <Navbar />
      <div className="relative">
        <CardProduct style="w-full" />
      </div>
    </div>
  );
};

export default Home;
