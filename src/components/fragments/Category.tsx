import { useAuth } from "@/context/LoginContext";
import { useProductData } from "@/context/SearchContext";
import { getNewToken } from "@/hooks/useToken";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  style: string;
}

type Product = {
  id: string;
  name: string;
  url_category: string;
}

const Category = ({ style } : Props) => {
  const [category, setCategory] = useState<Product[]>([]);
  const { setProductData } = useProductData();
  const { accessToken, refreshToken, setTokens } = useAuth();

  const chooseCategory = async (category: any) => {
    try {
      const response = await axiosInstance.get(`/product/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
        params: {
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

  const defaultCategory = async () => {
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

  const getCategoryProduct = async () => {
    const config = {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    };
    try {
      const response = await axiosInstance.get("/product/homepage", config);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryProduct();
    if (accessToken) {
      defaultCategory();
    }
  }, []);

  return (
    <main
      className={`${style} flex flex-col justify-center items-center relative z-1 pb-20`}
    >
      <h1 className="self-start pt-8 pb-8 px-10 font-bold text-[28px] text-[#0F172A]">
        Kategori
      </h1>
      <div className="grid grid-cols-4 gap-x-24 gap-y-14 px-12">
        {category.map((item) => (
          <Link
            key={item.id}
            onClick={() => {
              chooseCategory(item.name);
            }}
            to={"/search"}
          >
            <div className="flex flex-col h-full justify-center items-center gap-2 rounded-lg shadow-zinc-300 shadow">
              <img
                className="w-full h-full max-w-60 max-h-60 object-contain rounded-lg p-2"
                src={item.url_category}
                alt={`img`}
              />
              <p className="text-center text-lg font-medium p-3 text-[#0F172A]">
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
