import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/fragments/HeaderAuth";
import { useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";

const ResetConfirm = () => {
  const { token } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loadButton, setLoadButton] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`auth/reset/${token}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      password: password,
      confirm_password: confirm,
    };
    try {
      setLoadButton(true);
      const response = await axiosInstance.patch(`auth/reset/${token}`, data);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      navigate("/login")
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      toast({
        variant: "destructive",
        title: errorMessage,
      });
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
    <main className="">
      <Navbar title="Reset kata sandi" />
      <div className="flex justify-around items-center min-h-screen relative px-10 bg-[#135699]">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="/src/assets/reset01.png"
          alt="img"
        />
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-24 w-[450px] gap-7 p-6 rounded-lg bg-white"
        >
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
              placeholder="Konfirmasi Kata sandi baru"
              type={visible2 ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirm}
              onKeyPress={handleKeyPress}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {loadButton ? (
            <Button className="h-12 px-12" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button className="h-12 px-16">Kirim</Button>
          )}
        </form>
      </div>
    </main>
  );
};

export default ResetConfirm;
