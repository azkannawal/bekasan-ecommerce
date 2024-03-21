import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getNewToken } from "@/hooks/useToken";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/context/LoginContext";

interface Product {
  product_name: string;
  product_price: number;
  owner_name: string;
  cancel_code: string;
  url_product: string;
}

const SellTransaction = () => {
  const { accessToken, refreshToken, setTokens } = useAuth();
  const [data, setData] = useState<Product[]>([]);
  const id = "asdfasf";

  const patchConfirm = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true,
      },
    };
    const data = {
      withdrawal_code: "daddad",
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

  const getList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": true,
      },
    };
    try {
      const response = await axiosInstance.get(`transaction/sell-list`, config);
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
      {data ? (
        data.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <div className="flex gap-6">
              <img src={item.url_product} className="w-40" alt="img" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{item.product_name}</h1>
                <h2 className="text-lg font-semibold text-[#135699]">
                Rp {item.product_price}
                </h2>
                <h3 className="font-semibold">{item.owner_name}</h3>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-2">
              <h1 className="text-lg tracking-wider">Token: {item.cancel_code}</h1>
              <div className="flex gap-3">
                <Button onClick={patchConfirm}>Konfirmasi transaksi</Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-lg">Belum ada barang yang terjual</h1>
      )}
    </main>
  );
};

export default SellTransaction;
