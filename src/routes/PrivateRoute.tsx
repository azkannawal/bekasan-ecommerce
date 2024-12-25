import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);
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
