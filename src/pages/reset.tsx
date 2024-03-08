import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../components/fragments/HeaderAuth";

const Reset = () => {
  return (
    <main className="">
      <Navbar title="Reset kata sandi" />
      <div className="flex justify-around items-center min-h-screen relative px-10 bg-[#135699]">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="./reset01.png"
          alt="img"
        />
        <form className="flex flex-col justify-center items-center mt-24 w-[450px] gap-7 p-6 rounded-lg bg-white">
          <h1 className="self-start text-2xl font-semibold mb-3">
            Reset kata sandi
          </h1>
          <Input placeholder="Email akun UB" type="email" required />
          <Button className="h-12 px-16">Kirim</Button>
        </form>
      </div>
    </main>
  );
};

export default Reset;
