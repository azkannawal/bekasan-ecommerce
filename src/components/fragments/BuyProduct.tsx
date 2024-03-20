import React, { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/context/LoginContext";
import { getNewToken } from "@/hooks/useToken";
import { Input } from "../ui/input";

interface BuyProductProps {
  id: string;
}

const BuyProduct: React.FC<BuyProductProps> = ({ id }) => {
  const { toast } = useToast();
  const [check, setCheck] = useState<boolean>(false);
  const [buy, setBuy] = useState<boolean>(false);
  const { accessToken, refreshToken, setTokens } = useAuth();

  const handlePay = async () => {
    try {
      const response = await axiosInstance.post(`/product/${id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
      });
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
      console.log(response.data);
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

  return (
    <div className="flex flex-col w-2/6 px-8">
      {buy ? (
        <div className="flex flex-col bg-[#135699] gap-6 p-6 rounded-lg">
          <h2 className="text-xl font-semibold pb-1 uppercase text-white">
            Peringatan
          </h2>
          <ol className="flex flex-col leading-loose pb-1 text-white list-decimal list-inside">
            <li>{`WAJIB melakukan chat kepada penjual untuk mengatur jadwal COD.`}</li>
            <li>{`MAX waktu membatalkan janji pertemuan 30 menit sebelum waktu janji pertemuan.`}</li>
            <li>{`Jika melanggar poin 2, dikenakan denda 20% dari harga barang untuk harga barang < Rp 100.000 dan denda Rp 20.000 untuk harga barang > Rp 100.000.`}</li>
            <li>{`Denda pada poin 3 akan memotong dari uang Anda yang telah ditransfer ke sistem.`}</li>
          </ol>
          <div className="flex justify-center items-start gap-x-4">
            <Input
              type="checkbox"
              className="w-8"
              onClick={() => {
                setCheck(!check);
              }}
            />
            <p className="leading-loose pb-1 text-white">
              Tekan “Check Box” jika Anda telah membaca dan memahami isi
              peringatan.
            </p>
          </div>
          {check ? (
            <Button
              onClick={() => {
                handlePay();
              }}
              className="py-[22px] bg-white text-[#0f1720 hover:bg-white]"
            >
              Beli
            </Button>
          ) : (
            <Button disabled className="py-[22px] bg-white text-[#0f1720]">
              Beli
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col bg-[#135699] gap-6 p-6 rounded-lg">
          <Button
            onClick={() => {
              setBuy(true);
            }}
            className="py-[22px] bg-white text-[#0f1720] hover:bg-slate-100"
          >
            Beli
          </Button>
        </div>
      )}
    </div>
  );
};

export default BuyProduct;
