import { useAuth } from "@/context/LoginContext";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import Landing from "./../components/fragments/Landing";
import Category from "./../components/fragments/Category";
import { useUser } from "@/context/RegisterContext";
import { getNewToken } from "@/hooks/useToken";
import { useNavigate } from "react-router-dom";
import AddNavbar from "@/components/layouts/AddNavbar";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verify, setVerify] = useState(false);
  const { accessToken, refreshToken } = useAuth();
  const { setUserData } = useUser();
  const { setTokens } = useAuth();
  const space = verify ? "pt-[68px]" : "pt-24";

  const getUserData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true,
      },
    };
    try {
      const response = await axiosInstance.get("auth/my-data", config);
      setUserData(response.data.data.id, response.data.data.name);
    } catch (error: any) {
      if (
        error.response.status === 401 &&
        error.response.data.is_expired === true
      ) {
        getNewToken(refreshToken, setTokens);
      } else if (
        error.response.status === 401 &&
        error.response.data.is_expired === false
      ) {
        navigate("/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else {
        toast({
          variant: "destructive",
          description: error.response.data.message,
        });
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      setVerify(true);
      getUserData();
    } else {
      setVerify(false);
    }
  }, [accessToken]);

  return (
    <AddNavbar>
      {verify ? null : <Landing />}
      <main className="relative">
        <Category style={`w-full ${space}`} />
      </main>
    </AddNavbar>
  );
};

export default Home;
