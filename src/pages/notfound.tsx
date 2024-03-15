import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-[#135699]">
      <p className="font-semibold text-lg text-white">
        Halaman tidak ditemukan
      </p>
      <Link to="/">
        <Button>Kembali ke Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
