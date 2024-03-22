import { useState } from "react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/context/LoginContext";
import { getNewToken } from "@/hooks/useToken";
import { useProductData } from "@/context/SearchContext";

const SearchField = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { accessToken, refreshToken, setTokens } = useAuth();
  const { setProductData, setSavedQuery } = useProductData();

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/product/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
        params: {
          query: searchQuery,
          page: 1,
        },
      });
      setSavedQuery(searchQuery);
      console.log(response.data.data.products);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={() => navigate("/search")}
        placeholder="Cari Produk"
        type="text"
        className="bg-white rounded-xl focus-visible:ring-1 focus-visible:ring-slate-500 border-none"
      />
    </div>
  );
};

export default SearchField;
