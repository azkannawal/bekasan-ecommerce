import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/RegisterContext";
import AddHeaderAuth from "@/components/layouts/AddHeaderAuth";

const Verify = () => {
  const { userId } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loadButton, setLoadButton] = useState(false);
  const [otp, setOtp] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      id: userId,
      verification_code: otp,
    };

    try {
      setLoadButton(true);
      const response = await axiosInstance.patch("auth/register", data);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      navigate("/login");
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

  const resend = async () => {
    const data = {
      id: userId,
    };
    try {
      setLoadButton(true);
      const response = await axiosInstance.patch("auth/register/resend", data);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
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

  return (
    <AddHeaderAuth title="verifikasi akun">
      <main className="flex justify-around items-center min-h-screen relative px-10 bg-[#135699]">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="./reset01.png"
          alt="img"
        />
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-16 w-[450px] gap-7 p-6 rounded-lg bg-white"
        >
          <div className="self-start mb-2">
            <h1 className="text-2xl font-semibold mb-2">
              Masukkan kode verifikasi
            </h1>
            <p>
              Kode verifikasi tidak diterima?{" "}
              <span
                onClick={resend}
                className="font-bold text-[#0F172A] hover:underline"
              >
                Kirim ulang
              </span>
            </p>
          </div>
          <Input
            placeholder="Kode verifikasi(6 Digit)"
            type="text"
            pattern="[0-9]{6}"
            value={otp}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d{0,6}$/.test(input)) {
                setOtp(input);
              }
            }}
            required
          />
          {loadButton ? (
            <Button className="h-12 px-12" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Tunggu
            </Button>
          ) : (
            <Button className="h-12 px-16">Kirim</Button>
          )}
        </form>
      </main>
    </AddHeaderAuth>
  );
};

export default Verify;
