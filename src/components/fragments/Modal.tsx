import { ChangeEvent } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/LoginContext";
import { axiosInstance } from "@/lib/axios";
import { getNewToken } from "@/hooks/useToken";

interface ModalProps {
  option: number;
  id: string;
  title: string;
  description: string;
  button: string;
  placeholder: string;
  valid: boolean;
  input: string;
  closeModal: () => void;
  setInput: (value: string) => void;
}

const Modal = ({
  option,
  id,
  title,
  description,
  button,
  closeModal,
  placeholder,
  valid,
  input,
  setInput,
}: ModalProps) => {
  const { accessToken, refreshToken, setTokens } = useAuth();
  const { toast } = useToast();
  const match: boolean = input === id;
  const chooseFunction = { option };
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": true,
    },
  };

  const deleteCancel = async () => {
    try {
      const response = await axiosInstance.delete(`transaction/${id}`, config);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      setInput("");
    } catch (error: any) {
      setInput("");
      if (
        error.response.status === 401 &&
        error.response.data.is_expired === true
      ) {
        getNewToken(refreshToken, setTokens);
      } else {
        console.log(error.response);
      }
    }
  };

  const deleteBuy = async () => {
    try {
      const response = await axiosInstance.delete(
        `transaction/${id}/cash-on-delivery`,
        {
          data: {
            cancel_code: input,
          },
          ...config,
        }
      );
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      setInput("");
    } catch (error: any) {
      setInput("");
      if (
        error.response.status === 401 &&
        error.response.data.is_expired === true
      ) {
        getNewToken(refreshToken, setTokens);
      } else {
        console.log(error.response);
      }
    }
  };

  const patchConfirm = async () => {
    const data = {
      withdraw_code: input,
    };
    try {
      const response = await axiosInstance.patch(
        `transaction/${id}/cash-on-delivery`,
        data,
        config
      );
      console.log(response.data.data);
    } catch (error: any) {
      if (
        error.response.status === 401 &&
        error.response.data.is_expired === true
      ) {
        getNewToken(refreshToken, setTokens);
      } else {
        console.log(error.response);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <main className="fixed right-0 left-0 mx-auto my-auto top-0 bottom-0 z-20 flex flex-col min-h-screen justify-center items-center">
      <div className="absolute z-10 h-auto bg-white shadow shadow-stone-400 w-[550px] px-4 py-3 rounded-lg">
        <div className="flex flex-col justify-center">
          <div className="flex justify-end w-full">
            <IoIosCloseCircle
              size={28}
              color="#0F172A"
              onClick={closeModal}
              className="cursor-pointer"
            />
          </div>
          <h1 className="text-center font-semibold mb-2">{title}</h1>
          <p className="mb-2 text-sm">{description}</p>
          <Input
            placeholder={placeholder}
            className="mb-3"
            value={input}
            onChange={handleChange}
          ></Input>
          <Button
            variant={"destructive"}
            className="py-6"
            disabled={match === valid}
            onClick={() => {
              if (chooseFunction.option == 1) {
                deleteCancel();
              } else if (chooseFunction.option == 2) {
                deleteBuy();
              } else if (chooseFunction.option == 3) {
                patchConfirm();
              }
            }}
          >
            {button}
          </Button>
        </div>
      </div>
      <div className="relative bg-black/40 w-full min-h-screen"></div>
    </main>
  );
};

export default Modal;
