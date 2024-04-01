import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/LoginContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();

  if (accessToken) {
    return <Outlet />;
  } else {
    toast({
      variant: "destructive",
      title: "Anda perlu login terlebih dahulu",
    });
  }
  
  return <Navigate to="/login" />;
};

export default PrivateRoute;
