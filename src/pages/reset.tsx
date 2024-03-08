import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "./../components/fragments/Navbar";

const Reset = () => {
  return (
    <main className="">
      <Navbar title="Reset kata sandi" />
      <div className="flex justify-center items-center min-h-screen relative bg-[#135699]">
        <form className="flex flex-col justify-center items-center mt-24 w-96 gap-7 p-6 rounded-lg bg-white">
          <h1 className="self-start text-2xl font-semibold mb-3">
            Reset kata sandi
          </h1>
          <Input placeholder="Email akun UB" type="email" />
          <Button className="h-12 px-16">Kirim</Button>
        </form>
      </div>
    </main>
  );
};

export default Reset;
