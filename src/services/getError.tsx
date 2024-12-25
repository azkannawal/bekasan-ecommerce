import { getNewToken } from "@/hooks/useToken";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

type Props = {
  err: any;
};

const getError = ({ err }: Props) => {
  const { refreshToken, setTokens } = useContext(AuthContext);

  if (err.response.status === 401 && err.response.data.is_expired === true) {
    getNewToken(refreshToken, setTokens);
  } else if (
    err.response.status === 401 &&
    err.response.data.is_expired === false
  ) {
    window.location.replace("/login");
    localStorage.removeItem("refreshToken");
  } else {
    console.log(err);
  }
};

export default getError;
