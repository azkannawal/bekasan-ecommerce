import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/context/LoginContext";
import { useEffect, useState } from "react";
import SearchField from "./SearchField";

const Navbar = () => {
  const [verify, setVerify] = useState(false);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col w-full z-10 pl-5 pr-10 fixed bg-[#135699]">
      {!verify ? (
        <div className="flex justify-end items-center gap-6 pt-2 px-2 w-full text-sm text-white">
          <Link
            to="https://wa.me/628112625894?text=Halo,%20saya%20memerlukan%20bantuan%20Customer%20Service"
            target="_blank"
            className="text-xs"
          >
            CS
          </Link>
          <Link to="/register" className="text-xs">
            Daftar
          </Link>
          <Link to="/login" className="text-xs">
            Masuk
          </Link>
        </div>
      ) : null}
      <div className="flex items-center gap-x-4 w-full">
        <Link to="/" className="w-auto">
          <img className="h-[80px]" src="/public/logo2.png" alt="img" />
        </Link>
        <div className="relative w-full">
          <span className="absolute cursor-pointer py-4 bottom-0 right-0 pr-4">
            <GoSearch size={20} color="#a2a3ab" />
          </span>
          <SearchField />
        </div>
        {verify ? (
          <>
            <Link to="/chat">
              <img src="/public/chat.png" className="m-2 h-6" />
            </Link>
            <img src="/public/notif.png" className="m-2 h-6" />
            <ProfileMenu />
          </>
        ) : (
          <img src="/public/logo.png" className="m-2 w-12 h-12 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
