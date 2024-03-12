import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/fragments/HeaderAuth";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      id: "05f1c0bd-926b-4255-b6bd-708a4caea756",
      verification_code: otp,
    };
    console.log(data);
    try {
      const response = await axiosInstance.patch("auth/register/verify", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resend = async () => {
    const data = {
      id: "05f1c0bd-926b-4255-b6bd-708a4caea756",
    };
    console.log(data);
    try {
      const response = await axiosInstance.patch("auth/register/resend", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
            <h2 className="">
              Kode verifikasi tidak diterima?{" "}
              <span onClick={resend} className="text-[#135699] underline">
                resend
              </span>
            </h2>
          </div>

          <Input
            placeholder="Kode verifikasi"
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
          <Button className="h-12 px-16">Kirim</Button>
        </form>
      </div>
    </main>
  );
};

export default Verify;
