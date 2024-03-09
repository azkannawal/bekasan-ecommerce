import { GoSearch } from "react-icons/go";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const verify = true;

  return (
    <div className="flex flex-col w-full z-10 pl-4 pr-10 fixed bg-[#135699]">
      {!verify ? (
        <div className="flex justify-end items-center gap-4 pt-2 px-2 w-full text-sm text-white">
          <Link to="https://www.whatsapp.com">CS</Link>
          <Link to="/register">Daftar</Link>
          <Link to="/login">Masuk</Link>
        </div>
      ) : null}
      <div className="flex items-center gap-x-4 w-full">
        <img className="h-[80px]" src="./logo2.png" alt="img" />
        <div className="relative w-full">
          <span className="absolute cursor-pointer py-4 top-0 right-0 pr-4">
            <GoSearch />
          </span>
          <Input
            placeholder="Cari Produk"
            type="text"
            className="bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-slate-500 border-none"
          />
        </div>
        {verify ? (
          <>
            <Link to="https://firechat-chi-nine.vercel.app">
              <img src="./chat.png" className="m-2 h-6" />
            </Link>
            <img src="./notif.png" className="m-2 h-6" />
            <ProfileMenu />
          </>
        ) : (
          <img src="./logo.png" className="m-2 w-12 h-12 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
