import { useAuth } from "@/context/LoginContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    } else null
  }, []);

  return accessToken;
};

export default useLogin;
