import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/context/AuthContext";
import { useUser } from "@/context/RegisterContext";
import { getNewToken } from "@/hooks/useToken";
import { axiosInstance } from "@/lib/axios";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { accessToken, refreshToken, setTokens } = useContext(AuthContext);
  const { setUserData } = useUser();
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
  });

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
      console.log(response.data.data);
      setData(response.data.data);
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
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
    <main className="flex bg-[#135699]">
      <div className="w-1/5 flex flex-col items-center pt-6 gap-4 text-white">
        <img src="./avatar.png" alt="img" className="h-24" />
        <h1 className="font-bold text-2xl">{data.name}</h1>
        <Link to="https://wa.me/628112625894?text=Halo,%20saya%20memerlukan%20bantuan%20customer%20service">
          <Button className="bg-green-700" onClick={handleLogout}>
            Hubungi CS
          </Button>
        </Link>
        <Link to="/login">
          <Button variant={"destructive"} onClick={handleLogout}>
            Keluar
          </Button>
        </Link>
      </div>
      <div className="w-4/5 flex flex-col h-screen gap-4 px-12 pt-6 bg-white">
        <h1 className="uppercase font-bold text-xl">Identitas diri</h1>
        <label htmlFor="name">Nama</label>
        <Input id="name" placeholder={data.name} disabled />
        <label htmlFor="email">Email akun UB</label>
        <Input id="email" placeholder={data.email} disabled />
        <label htmlFor="password">Kata sandi</label>
        <Input id="password" placeholder="********" type="password" disabled />
        <label htmlFor="address">Alamat</label>
        <Input id="address" placeholder={data.address} disabled />
        <label htmlFor="account">Nomor rekening</label>
        <form action="" className="flex gap-4">
          <Input id="account" placeholder="Nomor rekening" />
          <Button className="py-6">Tambah nomor rekening</Button>
        </form>
      </div>
    </main>
  );
};

export default Profile;
