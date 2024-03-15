import { Button } from "@/components/ui/button";
import Navbar from "./../components/fragments/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/context/LoginContext";
import { getNewToken } from "@/hooks/useToken";

const DetailProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    product_price: 0,
    media: [],
    owner_id: "",
    owner_name: "",
    owner_distance: 0,
    owner_photo_profile: "",
  });
  const { accessToken, refreshToken, setTokens } = useAuth();

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axiosInstance.get(`/product/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": true,
          },
        });
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
    getDetail();
  }, [id]);

  return (
    <main className="flex">
      <Navbar />
      <div className="flex pt-24 px-6 relative w-full gap-x-4">
        <div className="flex flex-col gap-x-2 px-8 w-2/6">
          <img src={data.media[0]} alt="img" className="w-full" />
          <div className="flex justify-center items-center gap-x-2 p-2">
            <img src={data.media[1]} alt="img" className="w-1/3" />
            <img src={data.media[0]} alt="img" className="w-1/3" />
            <img src={data.media[0]} alt="img" className="w-1/3" />
          </div>
        </div>
        <div className="flex flex-col w-2/6">
          <h1 className="text-3xl font-bold mb-1">{data.product_name}</h1>
          <p className="text-lg font-medium mb-6 text-[#135699]">
            Rp {data.product_price}
          </p>
          <h2 className="text-xl font-semibold pb-6">Detail Produk</h2>
          <p className="leading-loose pb-10">{data.product_description}</p>
          <div className="flex justify-between items-center gap-4 border border-[#135699] rounded-lg p-4">
            <div className="flex gap-x-6">
              <img
                src={data.owner_photo_profile}
                alt="img"
                className="w-12 h-12"
              />
              <div className="flex flex-col">
                <h3 className="font-bold">{data.owner_name}</h3>
                <h2>{data.owner_distance} KM</h2>
              </div>
            </div>
            <img src="../send.png" alt="img" className="h-8" />
          </div>
        </div>
        <div className="flex flex-col w-2/6 px-8">
          <div className="flex flex-col bg-[#135699] gap-6 p-6 rounded-lg">
            <Button className="py-[22px] bg-white text-[#0f1720]">Tawar</Button>
            <Button className="py-[22px] bg-white text-[#0f1720]">Beli</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailProduct;
