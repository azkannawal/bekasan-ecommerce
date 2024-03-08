import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "./../components/fragments/Navbar";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!visible);
  };
  return (
    <main className="">
      <Navbar title="Masuk" />
      <div className="flex justify-center items-center min-h-screen relative bg-[#135699]">
        <form className="flex flex-col justify-center items-center mt-7 w-96 gap-7 p-6 rounded-lg bg-white">
          <h1 className="self-start text-2xl font-semibold mb-7">Masuk</h1>
          <Input
            placeholder="Email akun UB"
            type="email"
            autoComplete="email"
          />
          <div className="relative w-full">
            <span
              onClick={toggle}
              className="absolute cursor-pointer py-4 top-0 right-0 pr-3"
            >
              {visible ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
            <Input
              placeholder="Kata sandi"
              type={visible ? "text" : "password"}
              autoComplete="new-password"
            />
          </div>
          <Button className="h-12 px-16">Masuk</Button>
          <div className="flex flex-col gap-2 text-center ">
            <p>
              Lupa kata sandi?{" "}
              <span className="uppercase font-bold text-sm">
                reset kata sandi
              </span>
            </p>
            <p>
              Belum punya akun?{" "}
              <span className="uppercase font-bold text-sm">daftar</span>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
