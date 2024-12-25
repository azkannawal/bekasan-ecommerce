import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Address from "@/components/fragments/Address";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState } from "react";
// import { addressUser } from "@/context/AddressContext";
import { axiosInstance } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/RegisterContext";
import AddHeaderAuth from "@/components/layouts/AddHeaderAuth";

const Register = () => {
  // const { user } = addressUser();
  const { setUserData } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loadButton, setLoadButton] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const address = "Malang";
  const longitude = -7.95217615839509;
  const latitude = 112.61271625437;
  const data = {
    name: name,
    email: email,
    password: password,
    confirm_password: confirm,
    address: address,
    latitude: latitude,
    longitude: longitude,
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoadButton(true);
      const response = await axiosInstance.post("auth/register", data);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      setUserData(response.data.data.id, "");
      navigate("/verify");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.message;
        const errorDescriptions = Object.values(error.response.data.errors);
        errorDescriptions.map((description) =>
          toast({
            variant: "destructive",
            title: errorMessage,
            description: description,
          }),
        );
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast({
          variant: "destructive",
          title: error.response.data.message,
        });
      }
    } finally {
      setLoadButton(false);
    }
  };

  const toggle = (field: number): void => {
    if (field === 1) {
      setVisible1(!visible1);
    } else if (field === 2) {
      setVisible2(!visible2);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <AddHeaderAuth title="bekasan">
      <main className="relative min-h-screen w-full bg-[#135699] pt-2">
        <div className="mx-auto mt-[80px] flex w-full max-w-[1400px] items-center justify-around px-[calc(3.5vw+5px)]">
          <img
            className="w-[450px] max-w-lg pt-16"
            src="./login01.png"
            alt="img"
          />
          <form
            onSubmit={onSubmit}
            className="flex w-[450px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-6"
          >
            <h1 className="mb-3 self-start text-2xl font-semibold">Daftar</h1>
            <Input
              placeholder="Nama"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Input
              placeholder="Email UB"
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
                className="absolute right-0 top-0 cursor-pointer py-4 pr-3"
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
                className="absolute right-0 top-0 cursor-pointer py-4 pr-3"
              >
                {visible2 ? (
                  <RiEyeOffFill className="text-slate-400" />
                ) : (
                  <RiEyeFill className="text-[#0F172A]" />
                )}
              </span>
              <Input
                placeholder="Konfirmasi kata sandi"
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
              <Button className="h-12 px-12" disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Tunggu
              </Button>
            ) : (
              <Button className="h-12 px-16">Daftar</Button>
            )}
            <p className="text-center">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-semibold hover:underline">
                Masuk
              </Link>
            </p>
          </form>
        </div>
      </main>
    </AddHeaderAuth>
  );
};

export default Register;
