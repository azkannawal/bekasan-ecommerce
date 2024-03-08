import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../components/fragments/HeaderAuth";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const ResetConfirm = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const toggle = (field: number): void => {
    if (field === 1) {
      setVisible1(!visible1);
    } else if (field === 2) {
      setVisible2(!visible2);
    }
  };

  return (
    <main className="">
      <Navbar title="Reset kata sandi" />
      <div className="flex justify-center items-center min-h-screen relative bg-[#135699]">
        <form className="flex flex-col justify-center items-center mt-24 w-96 gap-7 p-6 rounded-lg bg-white">
          <h1 className="self-start text-2xl font-semibold mb-3">
            Reset kata sandi
          </h1>
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
              placeholder="Kata sandi baru"
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
              placeholder="Konfirmasi Kata sandi baru"
              type={visible2 ? "text" : "password"}
              autoComplete="new-password"
              required
            />
          </div>
          <Button className="h-12 px-16">Kirim</Button>
        </form>
      </div>
    </main>
  );
};

export default ResetConfirm;
