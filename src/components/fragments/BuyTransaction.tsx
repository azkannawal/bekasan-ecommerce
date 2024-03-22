import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/context/LoginContext";
import { getNewToken } from "@/hooks/useToken";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { useUser } from "@/context/RegisterContext";

interface Product {
  product_name: string;
  product_price: string;
  owner_name: string;
  owner_id: string;
  withdrawal_code: number;
  url_product: string;
  transaction_id: string;
}

const BuyTransaction = () => {
  const { accessToken, refreshToken, setTokens } = useAuth();
  const [data, setData] = useState<Product[]>([]);
  const [modalState, setModalState] = useState<{ [key: string]: number }>({});
  const [input, setInput] = useState<string>("");
  const [auto, setAuto] = useState(false);
  const { userId } = useUser();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": true,
    },
  };

  const getList = async () => {
    try {
      const response = await axiosInstance.get(`transaction/buy-list`, config);
      setData(response.data.data);
      console.log(response.data.data);
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

  useEffect(() => {
    getList();
  }, [auto, accessToken]);

  return (
    <main className="flex flex-col gap-2 py-4 relative">
      {data ? (
        data.map((item, index) => (
          <div
            className="flex justify-between pb-4 border-b border-[#135699] relative"
            key={index}
          >
            <div className="flex lg:flex-row sm:flex-col gap-6">
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
              <h1 className="tracking-wider">Token: {item.withdrawal_code}</h1>
              <div className="flex gap-3">
                <Button
                  variant={"destructive"}
                  onClick={() => openModal(item.transaction_id, 1)}
                >
                  Batalkan
                </Button>
                <Button onClick={() => openModal(item.transaction_id, 2)}>
                  Tidak Jadi Beli
                </Button>
                <Link to={`../chat/toseller/${item.owner_id}${userId}`}>
                  <Button>Chat Penjual</Button>
                </Link>
              </div>
            </div>
            {modalState[item.transaction_id] === 1 && (
              <Modal
                option={1}
                id={item.transaction_id}
                title="Pembatalan transaksi"
                description={`Jika Anda yakin, ketik "${item.transaction_id}"`}
                button="Batalkan Transaksi"
                closeModal={() => closeModal(item.transaction_id)}
                placeholder="Ketik kode konfirmasi batal disini"
                valid={false}
                input={input}
                setInput={handleInputChange}
              />
            )}
            {modalState[item.transaction_id] === 2 && (
              <Modal
                option={2}
                id={item.transaction_id}
                title="Konfirmasi tidak jadi beli"
                description={`Masukkan token dari penjual agar transaksi dibatalkan dan uang kembali`}
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
        <h1 className="text-lg">Belum ada transaksi yang sudah dibayar</h1>
      )}
    </main>
  );
};

export default BuyTransaction;
