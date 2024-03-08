import { GoSearch } from "react-icons/go";
import { Input } from "../ui/input";
const Navbar = () => {
  return (
    <div className="flex flex-col w-full z-10 fixed px-4 py-1.5 bg-[#135699]">
      <div className="flex justify-end items-center gap-4 py-1 w-full text-sm text-white">
        <p>CS</p>
        <p>Daftar</p>
        <p>Masuk</p>
      </div>
      <div className="flex items-center gap-x-4 w-full">
        <img className="w-[84px]" src="./logo2.png" alt="img" />
        <div className="relative w-full">
          <span className="absolute cursor-pointer py-4 top-0 right-0 pr-4">
            <GoSearch />
          </span>
          <Input
            placeholder="Cari Produk"
            type="text"
            className="bg-white focus-visible:ring-0 border-none"
          />
        </div>
        <img
          src="./logo.png"
          className="uppercase font-bold text-2xl m-2 w-12 h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
