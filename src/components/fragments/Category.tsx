import { useAuth } from "@/context/LoginContext";
import { useProductData } from "@/context/SearchContext";
import { getNewToken } from "@/hooks/useToken";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  style: string;
}

interface Product {
  id: string;
  name: string;
  url_category: string;
}

const Category: React.FC<Props> = ({ style }) => {
  const [category, setCategory] = useState<Product[]>([]);
  const { setProductData } = useProductData();
  const { accessToken, refreshToken, setTokens } = useAuth();

  const handleSearch = async (category: any) => {
    try {
      const response = await axiosInstance.get(`/product/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
        params: {
          query: "",
          category: category,
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

  const getCategoryProduct = async () => {
    const config = {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    };
    try {
      const response = await axiosInstance.get("product/", config);
      console.log(response.data.data);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, []);

  return (
    <main
      className={`${style} flex flex-col justify-center items-center relative z-1 pb-12`}
    >
      <h1 className="self-start pt-8 pb-8 px-12 font-bold text-[28px] text-[#0F172A]">
        Kategori
      </h1>
      <div className="grid grid-cols-4 gap-x-32 gap-y-14 ">
        {category.map((item) => (
          <Link
            key={item.id}
            onClick={() => {
              setTimeout(() => {
                handleSearch(item.name);
              }, 800);
            }}
            to={"/search"}
          >
            <div className="flex flex-col text-center gap-2">
              <img
                className="w-60 rounded-lg"
                src={item.url_category}
                alt={`img`}
              />
              <p className="text-lg font-semibold text-[#0F172A]">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Category;
