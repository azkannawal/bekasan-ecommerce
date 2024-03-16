import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/LoginContext";
import { axiosInstance } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { accessToken, setTokens } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axiosInstance.delete(`/auth/logout`, config);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setTokens("", "");
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    }
  };
  
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-[#135699]">
      <Link to="/login">
        <Button onClick={handleLogout}>Profile</Button>
      </Link>
    </div>
  );
};

export default Profile;
