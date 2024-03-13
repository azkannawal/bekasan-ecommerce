import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/fragments/HeaderAuth";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

const Verify = () => {
  const { toast } = useToast();
  const [loadButton, setLoadButton] = useState(false);
  const [otp, setOtp] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      id: "05f1c0bd-926b-4255-b6bd-708a4caea756",
      verification_code: otp,
    };

    try {
      setLoadButton(true);
      const response = await axiosInstance.patch("auth/register/verify", data);
      toast({
        description: response.data.message,
      });
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      const errorDescriptions = Object.values(error.response.data.errors);
      errorDescriptions.map((description) =>
        toast({
          variant: "destructive",
          title: errorMessage,
          description: description,
        })
      );
    } finally {
      setLoadButton(false);
    }
  };

  const resend = async () => {
    const data = {
      id: "05f1c0bd-926b-4255-b6bd-708a4caea756",
    };
    try {
      setLoadButton(true);
      const response = await axiosInstance.patch("auth/register/resend", data);
      toast({
        description: response.data.message,
      });
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      const errorDescriptions = Object.values(error.response.data.errors);
      errorDescriptions.map((description) =>
        toast({
          variant: "destructive",
          title: errorMessage,
          description: description,
        })
      );
    } finally {
      setLoadButton(false);
    }
  };

  return (
    <main className="">
      <Navbar title="verifikasi akun" />
      <div className="flex justify-around items-center min-h-screen relative px-10 bg-[#135699]">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="../reset01.png"
          alt="img"
        />
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-24 w-[450px] gap-7 p-6 rounded-lg bg-white"
        >
          <div className="self-start mb-3">
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
      </div>
    </main>
  );
};

export default Verify;