import { useAuth } from "@/context/LoginContext";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
  const { accessToken } = useAuth();
  if (accessToken) return <Navigate to="/" />;

  return <Outlet />;
};

export default AuthRoute;
