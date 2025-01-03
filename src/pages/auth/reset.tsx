import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import AddHeaderAuth from "@/components/layouts/AddHeaderAuth";

const Reset = () => {
  const { toast } = useToast();
  const [loadButton, setLoadButton] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
    };

    try {
      setLoadButton(true);
      const response = await axiosInstance.post("auth/reset", data);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      setEmail("");
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setEmail("");
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      setLoadButton(false);
    }
  };

  return (
    <AddHeaderAuth title="bekasan">
      <main className="relative flex min-h-screen items-center justify-around bg-[#135699] px-10">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="./reset01.png"
          alt="img"
        />
        <form
          onSubmit={onSubmit}
          className="mt-16 flex w-[450px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-6"
        >
          <h1 className="mb-3 self-start text-2xl font-semibold">
            Reset kata sandi
          </h1>
          <Input
            placeholder="Email akun UB terdaftar"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default Reset;
