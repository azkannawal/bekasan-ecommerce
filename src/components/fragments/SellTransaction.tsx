import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getNewToken } from "@/hooks/useToken";
import { axiosInstance } from "@/lib/axios";
import Modal from "./Modal";
import { AuthContext } from "@/context/AuthContext";

interface Product {
  product_name: string;
  product_price: string;
  owner_name: string;
  cancel_code: number;
  url_product: string;
  transaction_id: string;
}

const SellTransaction = () => {
  const { accessToken, refreshToken, setTokens } = useContext(AuthContext);
  const [modalState, setModalState] = useState<{ [key: string]: number }>({});
  const [data, setData] = useState<Product[]>([]);
  const [input, setInput] = useState<string>("");
  const [auto, setAuto] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": true,
    },
  };

  const getList = async () => {
    try {
      const response = await axiosInstance.get(`transaction/sell-list`, config);
      setData(response.data.data);
      const initialState = response.data.data.reduce(
        (acc: any, item: Product) => {
          acc[item.transaction_id] = 0;
          return acc;
        },
        {}
      );
      setModalState(initialState);
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
  }, [auto, accessToken]);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const openModal = (id: string, option: number) => {
    setModalState((prevState) => ({
      ...prevState,
      [id]: option,
    }));
  };

  const closeModal = (id: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [id]: 0,
    }));
    setAuto(true);
  };

  return (
    <main className="flex flex-col gap-2 py-4 relative">
      {data ? (
        data.map((item, index) => (
          <div
            className="flex justify-between pb-4 border-b border-[#135699] relative"
            key={index}
          >
            <div className="flex gap-6">
              <img src={item.url_product} className="w-40" alt="img" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{item.product_name}</h1>
                <h2 className="text-lg font-semibold text-[#135699]">
                  {parseFloat(item.product_price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h2>
                <h3 className="font-semibold">{item.owner_name}</h3>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-2">
              <h1 className="text-lg tracking-wider">
                Token: {item.cancel_code}
              </h1>
              <div className="flex gap-3">
                <Button onClick={() => openModal(item.transaction_id, 3)}>
                  Konfirmasi transaksi
                </Button>
              </div>
            </div>
            {modalState[item.transaction_id] === 3 && (
              <Modal
                option={3}
                id={item.transaction_id}
                title="Konfirmasi barang terjual"
                description={`Masukkan token dari pembeli agar uang dapat cair`}
                button="Konfirmasi"
                closeModal={() => closeModal(item.transaction_id)}
                placeholder="Ketik token"
                valid={true}
                input={input}
                setInput={handleInputChange}
              />
            )}
          </div>
        ))
      ) : (
        <h1 className="text-lg">Belum ada barang yang terjual</h1>
      )}
    </main>
  );
};

export default SellTransaction;
