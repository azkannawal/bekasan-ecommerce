import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/context/LoginContext";
import { getNewToken } from "@/hooks/useToken";
import BuyProduct from "./../components/fragments/BuyProduct";
import AddNavbar from "@/components/layouts/AddNavbar";

const DetailProduct = () => {
  const { id } = useParams();
  const { accessToken, refreshToken, setTokens } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
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

  const getDetail = async () => {
    try {
      const response = await axiosInstance.get(`/product/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
      });
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
    getDetail();
  }, [id]);

  return (
    <AddNavbar>
      <main className="flex pt-28 px-6 w-full gap-x-4">
        <div className="flex flex-col gap-y-2 px-8 w-2/6 ">
          <img
            src={data.media[selectedImage]}
            alt="img"
            className="w-full h-full max-h-80 object-contain rounded-lg  shadow-zinc-300 shadow"
          />
          <div className="flex justify-center items-center gap-x-2 p-2 object-contain rounded-lg shadow-zinc-300 shadow">
            <img
              src={data.media[0]}
              alt="img"
              className="w-1/3"
              onClick={() => setSelectedImage(0)}
            />
            {data.media.length > 1 && (
              <>
                {data.media.slice(1, 3).map((media, index) => (
                  <img
                    key={index + 1}
                    src={media}
                    alt="img"
                    className="w-1/3"
                    onClick={() => setSelectedImage(index + 1)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col w-2/6">
          <h1 className="text-2xl font-bold mb-2">{data.product_name}</h1>
          <p className="text-xl font-medium mb-6 text-[#135699]">
            Rp {data.product_price.toLocaleString("id-ID")}
          </p>
          <h2 className="text-xl font-semibold pb-3">Detail Produk</h2>
          <p className="leading-loose pb-10">{data.product_description}</p>
          <div className="flex justify-between items-center gap-4 rounded-lg p-4 shadow-zinc-300 shadow">
            <div className="flex gap-x-6">
              <img
                src={data.owner_photo_profile}
                alt="img"
                className="w-12 h-12 rounded"
              />
              <div className="flex flex-col">
                <h3 className="font-bold">{data.owner_name}</h3>
                <h2> {(data.owner_distance / 1000).toFixed(2)} KM</h2>
              </div>
            </div>
            <img
              src="https://i.ibb.co/6wW3rrf/send.png"
              alt="img"
              className="h-8"
            />
          </div>
        </div>
        {id ? <BuyProduct id={id} /> : null}
      </main>
    </AddNavbar>
  );
};

export default DetailProduct;
