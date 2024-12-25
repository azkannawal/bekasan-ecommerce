import SearchProduct from "./../components/fragments/SearchProduct";
import { axiosInstance } from "@/lib/axios";
import { getNewToken } from "@/hooks/useToken";
import { useProductData } from "@/context/SearchContext";
import { Button } from "@/components/ui/button";
import { FaSortAmountDown } from "react-icons/fa";
import CategoryDropdown from "./../components/fragments/CategoryDropdown";
import AddNavbar from "@/components/layouts/AddNavbar";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const Search = () => {
  const { setProductData, savedQuery, setSavedQuery } = useProductData();
  const { accessToken, refreshToken, setTokens } = useContext(AuthContext);
  const [savedCategory, setSavedCategory] = useState("");

  const handleSearch = async (
    category: string,
    sort: string,
  ): Promise<void> => {
    try {
      let query = savedQuery;

      if (!category && savedCategory) {
        category = savedCategory;
      } else if (!category && !savedCategory) {
        query = savedQuery;
      } else if (category) {
        query = "";
      }
      const response = await axiosInstance.get(`/product/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
        params: {
          query: query,
          category: category,
          sort: sort,
          page: 1,
        },
      });
      setProductData(response.data.data.products);
      setSavedCategory(category);
      if (category) {
        setSavedQuery("");
      }
    } catch (error: any) {
      if (error.response?.status === 401 && error.response.data.is_expired) {
        getNewToken(refreshToken, setTokens);
      } else {
        console.error(error.response);
      }
    }
  };

  return (
    <AddNavbar>
      <main className="flex">
        <div className="relative min-h-screen w-1/5 bg-[#135699]">
          <div className="fixed flex w-1/5 flex-col gap-4 p-8 pt-24">
            <h1 className="px-2 text-2xl font-bold text-white">Filter</h1>
            <CategoryDropdown handleSearch={handleSearch} />
            <h1 className="px-2 pt-6 text-2xl font-bold text-white">Sort</h1>
            <Button
              onClick={() => handleSearch("", "price")}
              variant="ghost"
              className="justify-between px-2 text-white"
            >
              Harga
              <FaSortAmountDown className="mr-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleSearch("", "distance")}
              variant="ghost"
              className="justify-between px-2 text-white"
            >
              Jarak
              <FaSortAmountDown className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-4/5">
          <SearchProduct />
        </div>
      </main>
    </AddNavbar>
  );
};

export default Search;
