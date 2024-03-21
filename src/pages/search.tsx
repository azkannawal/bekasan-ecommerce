import SearchProduct from "./../components/fragments/SearchProduct";
import useNot from "@/hooks/useNot";
import { axiosInstance } from "@/lib/axios";
import { getNewToken } from "@/hooks/useToken";
import { useProductData } from "@/context/SearchContext";
import { useAuth } from "@/context/LoginContext";
import { Button } from "@/components/ui/button";
import { FaSortAmountDown } from "react-icons/fa";
import CategoryDropdown from './../components/fragments/CategoryDropdown';
import AddNavbar from "@/components/layouts/AddNavbar";

const Search: React.FC = () => {
  useNot();
  const { setProductData } = useProductData();
  const { accessToken, refreshToken, setTokens } = useAuth();

  const handleSearch = async (category: string, sort: string): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/product/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
        params: {
          query: "",
          category: category,
          sort: sort,
          page: 1,
        },
      });
      setProductData(response.data.data.products);
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
        <div className="w-1/5 relative bg-[#135699] ">
          <div className="flex flex-col fixed gap-4 pt-24 p-8 w-1/5">
            <h1 className="text-2xl font-bold text-white px-2">Filter</h1>
            <CategoryDropdown handleSearch={handleSearch} />
            <h1 className="text-2xl font-bold text-white pt-6 px-2">Sort</h1>
            <Button onClick={() => handleSearch("", "price")} variant="ghost" className="justify-between px-2 text-white">
              Harga
              <FaSortAmountDown className="mr-2 h-4 w-4" />
            </Button>
            <Button onClick={() => handleSearch("", "distance")} variant="ghost" className="justify-between px-2 text-white">
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
