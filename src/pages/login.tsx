import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../components/fragments/HeaderAuth";
import { useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useUser();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setUser({ username: "azkan nawal" });
    return () => {};
  }, []);

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <main className="">
      <Link to="/">
        <Navbar title="Masuk" />
      </Link>
      <div className="flex justify-around items-center min-h-screen relative bg-[#135699] pt-8 px-10">
        <img className="w-[450px] max-w-lg" src="./login01.png" alt="img" />
        <form className="flex flex-col justify-center items-center mt-7 w-[450px] gap-7 p-6 rounded-lg bg-white">
          {user ? <h1>{user.username}</h1> : null}
          <h1 className="self-start text-2xl font-semibold mb-7">Masuk</h1>
          <Input
            placeholder="Email akun UB"
            type="email"
            autoComplete="email"
            required
          />
          <div className="relative w-full">
            <span
              onClick={toggle}
              className="absolute cursor-pointer py-4 top-0 right-0 pr-3"
            >
              {visible ? (
                <RiEyeOffFill className="text-slate-400" />
              ) : (
                <RiEyeFill className="text-[#0F172A]" />
              )}
            </span>
            <Input
              placeholder="Kata sandi"
              type={visible ? "text" : "password"}
              autoComplete="new-password"
              required
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
