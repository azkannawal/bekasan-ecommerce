import { useContext, useEffect, useState } from "react";
import Landing from "@/components/fragments/Landing";
import Category from "@/components/fragments/Category";
import AddNavbar from "@/components/layouts/AddNavbar";
import getUserData from "@/services/getUserData";
import { AuthContext } from "@/context/AuthContext";
import { useUser } from "@/context/RegisterContext";
import { getNewToken } from "@/hooks/useToken";

const Home = () => {
  const { refreshToken, setTokens } = useContext(AuthContext);
  const [verify, setVerify] = useState(false);
  const { setUserData } = useUser();
  const setSpace = verify ? "pt-[68px]" : "pt-24";

  const getData = () => {
    getUserData((data: any) => {
      setUserData(data.id, data.name);
    });
  };

  useEffect(() => {
    if (refreshToken) {
      getNewToken(refreshToken, setTokens);
      getData();
      setVerify(true);
    } else {
      setVerify(false);
    }
  }, [refreshToken]);

  return (
    <AddNavbar>
      {verify ? null : <Landing />}
      <main className="relative">
        <Category style={`w-full ${setSpace}`} />
      </main>
    </AddNavbar>
  );
};

export default Home;
