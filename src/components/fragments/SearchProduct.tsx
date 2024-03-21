import { useAuth } from "@/context/LoginContext";
import { useProductData } from "@/context/SearchContext";
import { getNewToken } from "@/hooks/useToken";
import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const { productData, setProductData } = useProductData();
  const { accessToken, refreshToken, setTokens } = useAuth();

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(`/product/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
        params: {
          sort: "default",
          page: 1,
        },
      });
      setProductData(response.data.data.products);
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
    if (!productData) {
      getProduct();
    }
  }, []);

  return (
    <div className="grid grid-cols-3 pt-[110px] gap-12 px-12 mb-16">
      {productData
        ? productData!.map((item) => (
            <Link to={`/product/${item.product_id}`} key={item.product_id}>
              <div className="flex flex-col h-full w-full max-w-80 items-center rounded-lg shadow-zinc-300 shadow">
                <img
                  src={item.url_photo_product}
                  alt="img"
                  className="w-full h-full max-h-80 object-contain rounded-t-lg"
                />
                <div className="flex flex-col gap-1 pt-3 pb-4 w-full">
                  <h1 className="w-full px-3 text-lg font-medium text-[#0F172A]">
                    {item.product_name.length > 50
                      ? item.product_name.slice(0, 50) + "..."
                      : item.product_name}
                  </h1>
                  <h2 className="w-full px-3 font-medium text-[#135699]">
                    Rp {item.product_price.toLocaleString("id-ID")}
                  </h2>
                  <div className="w-full flex justify-between px-3 text-sm text-[#0F172A]">
                    <h3>{item.owner_name}</h3>
                    <h3>
                      {item.owner_distance < 1000
                        ? (item.owner_distance / 1).toFixed(0) + " M"
                        : (item.owner_distance / 1000).toFixed(2) + " KM"}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))
        : null}
    </div>
  );
};

export default SearchProduct;
