import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
  const { accessToken } = useContext(AuthContext);
  if (accessToken) return <Navigate to="/" />;

  return <Outlet />;
};

export default AuthRoute;
