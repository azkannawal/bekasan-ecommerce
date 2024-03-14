import Landing from "./../components/fragments/Landing";
import CardProduct from "../components/fragments/CardProduct";
import Navbar from "./../components/fragments/Navbar";
import { useAuth } from "@/context/LoginContext";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

const Home = () => {
  const [verify, setVerify] = useState(false);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      setVerify(true);
    }
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await axiosInstance.get("auth/my-data", config);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
