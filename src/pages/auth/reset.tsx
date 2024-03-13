import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/fragments/HeaderAuth";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();
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
        description: response.data.message,
      });
      navigate("/resetconfirm"); //soon
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
      <Navbar title="reset kata sandi" />
      <div className="flex justify-around items-center min-h-screen relative px-10 bg-[#135699]">
        <img
          className="w-[450px] max-w-lg pt-16"
          src="../reset01.png"
          alt="img"
        />
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center mt-24 w-[450px] gap-6 p-6 rounded-lg bg-white"
        >
          <h1 className="self-start text-2xl font-semibold mb-3">
            Reset kata sandi
          </h1>
          <Input
            placeholder="Email"
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
      </div>
    </main>
  );
};

export default Reset;