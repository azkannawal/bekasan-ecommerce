import { useContext, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import SearchField from "@/components/fragments/SearchField";

const Navbar = () => {
  const [verify, setVerify] = useState(false);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    if (accessToken) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  }, [accessToken]);

  return (
    <nav className="flex flex-col w-full z-10 fixed bg-[#135699]">
      <div className="mx-auto flex w-full flex-col max-w-[1400px] px-[calc(3.5vw+5px)]">
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
        <div className="flex items-center w-full gap-4 py-2.5">
          <Link to="/" className="w-auto">
            <img
              className="w-[60px]"
              src="https://i.ibb.co.com/MVJKSgy/logo-bekasan.png"
              alt="img"
            />
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
                <img
                  src="https://i.ibb.co/ZzSy4XM/chat.png"
                  className="m-2 h-6"
                />
              </Link>
              <Link to="/transaction">
                <FaHistory className="m-2 ml-3" size={25} color="white" />
              </Link>
              <Link to="/profile">
                <img
                  src="https://i.ibb.co/ctyg3bB/avatar.png"
                  className="m-2 h-10"
                />
              </Link>
            </>
          ) : (
           <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
