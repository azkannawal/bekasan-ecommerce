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
              <div className="flex flex-col gap-y-2 max-w-96">
                <img src={item.url_photo_product} alt="img" className="pb-1" />
                <h1 className="text-xl font-bold">{item.product_name}</h1>
                <h2 className="font-medium text-[#135699]">
                  Rp {item.product_price}
                </h2>
                <div className="flex justify-between">
                  <h3>{item.owner_name}</h3>
                  <h3>{parseFloat(item.owner_distance).toFixed(1)} KM</h3>
                </div>
              </div>
            </Link>
          ))
        : null}
    </div>
  );
};

export default SearchProduct;
