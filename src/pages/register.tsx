import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../components/fragments/HeaderAuth";
import Address from "@/components/fragments/Address";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState } from "react";

const Register = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const toggle = (field: number): void => {
    if (field === 1) {
      setVisible1(!visible1);
    } else if (field === 2) {
      setVisible2(!visible2);
    }
  };

  const onSubmit = () => {
    console.log("submitted");
  };
  return (
    <main className="">
      <Navbar title="Daftar" />
      <div className="flex justify-around items-center relative bg-[#135699] pt-4 px-10 min-h-screen">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="./register01.png"
          alt="img"
        />
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-16 w-[450px] gap-7 p-6 rounded-lg bg-white"
        >
          <h1 className="self-start text-2xl font-semibold mb-3">Daftar</h1>
          <Input placeholder="Nama akun" type="text" required />
          <Input
            placeholder="Email akun UB"
            type="email"
            autoComplete="email"
            required
          />
          <div className="relative w-full">
            <span
              onClick={() => toggle(1)}
              className="absolute cursor-pointer py-4 top-0 right-0 pr-3"
            >
              {visible1 ? (
                <RiEyeOffFill className="text-slate-400" />
              ) : (
                <RiEyeFill className="text-[#0F172A]" />
              )}
            </span>
            <Input
              placeholder="Kata sandi"
              type={visible1 ? "text" : "password"}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="relative w-full">
            <span
              onClick={() => toggle(2)}
              className="absolute cursor-pointer py-4 top-0 right-0 pr-3"
            >
              {visible2 ? (
                <RiEyeOffFill className="text-slate-400" />
              ) : (
                <RiEyeFill className="text-[#0F172A]" />
              )}
            </span>
            <Input
              placeholder="Konfirmasi Kata sandi"
              type={visible2 ? "text" : "password"}
              autoComplete="new-password"
              required
            />
          </div>
          <Address />
          <Button className="h-12 px-16">Daftar</Button>
        </form>
      </div>
    </main>
  );
};

export default Register;
