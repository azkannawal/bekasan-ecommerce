import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../components/fragments/HeaderAuth";
import Address from "@/components/fragments/Address";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const toggle = (field: number): void => {
    if (field === 1) {
      setVisible1(!visible1);
    } else if (field === 2) {
      setVisible2(!visible2);
    }
  };

  const onSubmit = async () => {
    const options = {
      method: "POST",
      url: "https//9a44-182-4-132-249.ngrok-free.app/api/v1/auth/register",
      data: {
        name: "John Doe",
        email: "johndoe@student.ub.ac.id",
        password: "password_john_doe",
        confirm_password: "password_john_doe",
        address:
          "Jl. Veteran, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
        latitude: -7.95217615839509,
        longitude: 112.61271625437,
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        response.data;
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <main className="">
      <Navbar title="Daftar" />
      <div className="flex justify-around items-center relative bg-[#135699] pt-4 px-10 min-h-screen">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="./login01.png"
          alt="img"
        />
        <div className="flex flex-col justify-center items-center mt-16 w-[450px] gap-7 p-6 rounded-lg bg-white">
          <h1 className="self-start text-2xl font-semibold mb-3">Daftar</h1>
          <Input
            placeholder="Nama akun"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email akun UB"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <Address />
          <Button className="h-12 px-16" onClick={onSubmit}>
            Daftar
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Register;
