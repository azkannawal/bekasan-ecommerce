import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { AuthContext } from "@/context/AuthContext";
import { useProductData } from "@/context/SearchContext";
import { getNewToken } from "@/hooks/useToken";
import { CategoryProps, Product } from "@/models/Category";
import getCategory from "@/services/getCategory";

const Category = ({ style }: CategoryProps) => {
  const { accessToken, refreshToken, setTokens } = useContext(AuthContext);
  const [category, setCategory] = useState<Product[]>([]);
  const { setProductData } = useProductData();

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

  const getData = async () => {
    getCategory((data: any) => {
      setCategory(data);
    });
  };

  useEffect(() => {
    getData();
    if (accessToken) {
      defaultCategory();
    }
  }, []);

  return (
    <main
      className={`${style} z-1 relative mx-auto flex max-w-[1400px] flex-col items-center justify-between px-[calc(3.5vw+5px)] pb-20`}
    >
      <h1 className="self-start px-10 pb-8 pt-8 text-[28px] font-bold text-[#0F172A]">
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
            <div className="flex h-full flex-col items-center justify-center border border-[#e0e0e0] gap-2 rounded-lg p-4 shadow-sm shadow-zinc-300">
              <img
                className="h-full max-h-48 rounded-lg object-cover"
                src={item.url_category}
                alt={`img`}
              />
              <p className="text-center font-medium text-[#0F172A]">
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
