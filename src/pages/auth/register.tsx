import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/fragments/HeaderAuth";
import Address from "@/components/fragments/Address";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

const Register: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const address = user ? user.address : "";
  const longitude = user ? user.longitude : "";
  const latitude = user ? user.latitude : "";

  const toggle = (field: number): void => {
    if (field === 1) {
      setVisible1(!visible1);
    } else if (field === 2) {
      setVisible2(!visible2);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      confirm_password: confirm,
      address: address,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      setLoadButton(true);
      const response = await axiosInstance.post("auth/register", data);
      if (response.status === 201 || response.status === 209) {
        toast({
          description: response.data.message,
        });
        navigate("/login");
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      const errorDescriptions = Object.values(error.response.data.errors);
      errorDescriptions.map((description) => (
        toast({
          variant: "destructive",
          title: errorMessage,
          description: description,
        })
      ));
    } finally {
      setLoadButton(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
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
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-16 w-[450px] gap-7 p-6 rounded-lg bg-white"
        >
          <h1 className="self-start text-2xl font-semibold mb-3">Daftar</h1>
          <Input
            placeholder="Nama akun"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Input
            placeholder="Email akun UB"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <Address />
          {loadButton ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button className="h-12 px-16">Daftar</Button>
          )}
        </form>
      </div>
    </main>
  );
};

export default Register;
