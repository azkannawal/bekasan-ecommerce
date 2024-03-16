import Navbar from "./../components/fragments/Navbar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SearchProduct from "./../components/fragments/SearchProduct";
import useNot from "@/hooks/useNot";
import { FaSortAmountUp } from "react-icons/fa";
import { axiosInstance } from "@/lib/axios";
import { getNewToken } from "@/hooks/useToken";
import { useProductData } from "@/context/SearchContext";
import { useAuth } from "@/context/LoginContext";
type Checked = DropdownMenuCheckboxItemProps["checked"];

const Search = () => {
  useNot();
  const { setProductData } = useProductData();
  const { accessToken, refreshToken, setTokens } = useAuth();
  const [dropdown1, setDropdown1] = useState(0);
  const [dropdown2, setDropdown2] = useState(0);
  const [dropdown3, setDropdown3] = useState(0);
  const [category1, setCategory1] = useState<Checked>(false);
  const [category2, setCategory2] = useState<Checked>(false);
  const [category3, setCategory3] = useState<Checked>(false);

  const toggleDropdown = (field: any): void => {
    if (field === 1) {
      setDropdown1((prevState) => (prevState === 0 ? 180 : 0));
    } else if (field === 2) {
      setDropdown2((prevState) => (prevState === 0 ? 180 : 0));
    } else {
      setDropdown3((prevState) => (prevState === 0 ? 180 : 0));
    }
  };

  const handleSearch = async (category: string, sort: string) => {
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

  return (
    <main>
      <Navbar />
      <div className="flex">
        <div className="w-1/5 relative bg-[#135699] ">
          <div className="flex flex-col fixed gap-4 pt-24 p-8 w-1/5">
            <h1 className="text-2xl font-bold text-white px-2">Filter</h1>
            <DropdownMenu onOpenChange={() => toggleDropdown(1)}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-between px-2 text-white"
                >
                  Kategori
                  <IoIosArrowDown
                    className="mr-2 h-4 w-4"
                    style={{
                      transition: "transform 0.5s",
                      transform: `rotate(${dropdown1}deg)`,
                    }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <DropdownMenuLabel>Kategori</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={category1}
                  onCheckedChange={setCategory1}
                  onClick={() => {
                    handleSearch("sepatu pria", "default");
                  }}
                >
                  Sepatu Pria
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={category2}
                  onCheckedChange={setCategory2}
                  onClick={() => {
                    handleSearch("pakaian pria", "default");
                  }}
                >
                  Pakaian Pria
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={category3}
                  onCheckedChange={setCategory3}
                  onClick={() => {
                    handleSearch("Perawatan & Kecantikan", "default");
                  }}
                >
                  Perawatan dan Kecantikan
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <h1 className="text-2xl font-bold text-white px-2">Sort</h1>
            <Button
              onClick={() => {
                toggleDropdown(2), handleSearch("", "price");
              }}
              variant="ghost"
              className="justify-between px-2 text-white"
            >
              Harga
              <FaSortAmountUp
                className="mr-2 h-4 w-4"
                style={{
                  transition: "transform 0.5s",
                  transform: `rotate(${dropdown2}deg)`,
                }}
              />
            </Button>
            <Button
              onClick={() => {
                toggleDropdown(3), handleSearch("", "distance");
              }}
              variant="ghost"
              className="justify-between px-2 text-white"
            >
              Jarak
              <FaSortAmountUp
                className="mr-2 h-4 w-4"
                style={{
                  transition: "transform 0.5s",
                  transform: `rotate(${dropdown3}deg)`,
                }}
              />
            </Button>
          </div>
        </div>
        <div className="w-4/5">
          <SearchProduct />
        </div>
      </div>
    </main>
  );
};

export default Search;
