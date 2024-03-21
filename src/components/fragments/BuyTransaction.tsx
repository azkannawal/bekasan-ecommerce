import { axiosInstance } from "@/lib/axios";
import { Button } from "../ui/button";
import { useAuth } from "@/context/LoginContext";
import { getNewToken } from "@/hooks/useToken";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

interface Product {
  product_name: string;
  product_price: number;
  owner_name: string;
  withdrawal_code: number;
  url_product: string;
}

const BuyTransaction = () => {
  const { toast } = useToast();
  const { accessToken, refreshToken, setTokens } = useAuth();
  const [data, setData] = useState<Product[]>([]);
  const id = "";

  const deleteCancel = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axiosInstance.delete(`transaction/${id}`, config);
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
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

  const deleteBuy = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axiosInstance.delete(
        `transaction/${id}/cash-on-delivery`,
        config
      );
      toast({
        variant: "sucsess",
        description: response.data.message,
      });
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

  const getList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true,
      },
    };
    try {
      const response = await axiosInstance.get(`transaction/buy-list`, config);
      console.log(response.data.data);
      setData(response.data.data);
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

  useEffect(() => {
    getList();
  }, []);

  return (
    <main className="flex flex-col gap-2 border-b border-slate-900 py-4">
      {data
        ? data.map((item, index) => (
            <div className="flex justify-between" key={index}>
              <div className="flex gap-6">
                <img src={item.url_product} className="w-40" alt="img" />
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">{item.product_name}</h1>
                  <h2 className="text-lg font-semibold text-[#135699]">
                    {item.product_price}
                  </h2>
                  <h3 className="font-semibold">{item.owner_name}</h3>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end gap-2">
                <h1 className="text-lg tracking-wider">
                  Token: {item.withdrawal_code}
                </h1>
                <div className="flex gap-3">
                  <Button variant={"destructive"} onClick={deleteCancel}>
                    Batalkan
                  </Button>
                  <Button onClick={deleteBuy}>Tidak Jadi Beli</Button>
                  <Button>Chat Penjual</Button>
                </div>
              </div>
            </div>
          ))
        : <h1 className="text-lg">Belum ada transaksi yang sudah dibayar</h1>}
    </main>
  );
};

export default BuyTransaction;
