import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/fragments/HeaderAuth";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    try {
      const response = await axiosInstance.post("auth/login", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggle = () => {
    setVisible(!visible);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <main className="">
      <Link to="/">
        <Navbar title="Masuk" />
      </Link>
      <div className="flex justify-around items-center min-h-screen relative bg-[#135699] pt-8 px-10">
        <img className="w-[450px] max-w-lg" src="./login01.png" alt="img" />
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-7 w-[450px] gap-7 p-6 rounded-lg bg-white"
        >
          <h1 className="self-start text-2xl font-semibold mb-7">Masuk</h1>
          <Input
            placeholder="Email akun UB"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onKeyPress={handleKeyPress}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
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
