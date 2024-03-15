import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/LoginContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useNot = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!accessToken) {
      toast({
        variant: "destructive",
        title: "Anda perlu login terlebih dahulu",
      });
      navigate("/login");
    } else null;
  }, []);

  return accessToken;
};

export default useNot;
