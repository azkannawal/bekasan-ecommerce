import { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import AddHeaderAuth from "@/components/layouts/AddHeaderAuth";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const { setTokens } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      setLoadButton(true);
      const response = await axiosInstance.post("auth/login", data);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      setTokens(
        response.data.data.access_token,
        response.data.data.refresh_token,
      );
      console.log(response.data);
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      console.log();
      toast({
        variant: "destructive",
        title: errorMessage,
      });
      if (error.response.status === 403) {
        navigate("/verify");
      }
    } finally {
      setLoadButton(false);
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
    <AddHeaderAuth title="bekasan">
      <main className="relative flex min-h-screen bg-[#135699]">
        <div className="mx-auto mt-[80px] flex w-full max-w-[1400px] items-center justify-around px-[calc(3.5vw+5px)]">
          <img className="w-[450px] max-w-lg " src="./login01.png" alt="img" />
          <form
            onSubmit={onSubmit}
            className="flex w-[450px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-6"
          >
            <h1 className="bg-gree mb-4 self-start text-2xl font-semibold">
              Masuk
            </h1>
            <Input
              placeholder="Email UB"
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
                className="absolute right-0 top-0 cursor-pointer py-4 pr-3"
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
            {loadButton ? (
              <Button className="h-12 px-12" disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Tunggu
              </Button>
            ) : (
              <Button className="h-12 px-16">Masuk</Button>
            )}
            <div className="flex flex-col gap-2 text-center">
              <p>
                Lupa kata sandi?{" "}
                <Link to="/reset" className="font-semibold hover:underline">
                  Reset kata sandi
                </Link>
              </p>
              <p>
                Belum punya akun?{" "}
                <Link to="/register" className="font-semibold hover:underline">
                  Daftar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </AddHeaderAuth>
  );
};

export default Login;
