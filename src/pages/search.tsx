import Navbar from "./../components/fragments/Navbar";
import CardProduct from "./../components/fragments/CardProduct";
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

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Search = () => {
  const [dropdown1, setDropdown1] = useState(0);
  const [dropdown2, setDropdown2] = useState(0);
  const [dropdown3, setDropdown3] = useState(0);
  const [category1, setCategory1] = useState<Checked>(false);
  const [category2, setCategory2] = useState<Checked>(false);
  const [category3, setCategory3] = useState<Checked>(false);
  const [price1, setPrice1] = useState<Checked>(false);
  const [price2, setPrice2] = useState<Checked>(false);
  const [price3, setPrice3] = useState<Checked>(false);
  const [price4, setPrice4] = useState<Checked>(false);
  const [distance1, setDistance1] = useState<Checked>(false);
  const [distance2, setDistance2] = useState<Checked>(false);
  const [distance3, setDistance3] = useState<Checked>(false);
  const [distance4, setDistance4] = useState<Checked>(false);

  const toggleDropdown = (field: any): void => {
    if (field === 1) {
      setDropdown1((prevState) => (prevState === 0 ? 180 : 0));
    } else if (field === 2) {
      setDropdown2((prevState) => (prevState === 0 ? 180 : 0));
    } else {
      setDropdown3((prevState) => (prevState === 0 ? 180 : 0));
    }
  };

  return (
    <main className="overflow-visible">
      <Navbar />
      <div className="flex">
        <div className="w-1/5 bg-[#135699]">
          <div className="flex flex-col fixed gap-4 pt-24 px-6 w-1/5">
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
                      transform: `rotate(${dropdown1}deg)`, // Menggunakan nilai state untuk rotasi ikon
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
                >
                  Sepatu
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={category2}
                  onCheckedChange={setCategory2}
                >
                  Tas
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={category3}
                  onCheckedChange={setCategory3}
                >
                  Lemari
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu onOpenChange={() => toggleDropdown(2)}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-between px-2 text-white"
                >
                  Harga
                  <IoIosArrowDown
                    className="mr-2 h-4 w-4"
                    style={{
                      transition: "transform 0.5s",
                      transform: `rotate(${dropdown2}deg)`,
                    }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <DropdownMenuLabel>Harga</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={price1}
                  onCheckedChange={setPrice1}
                >
                  Rp 0 - Rp 249.999
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={price2}
                  onCheckedChange={setPrice2}
                >
                  Rp 250.000 - Rp 499.999
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={price3}
                  onCheckedChange={setPrice3}
                >
                  Rp 500.000 - Rp 999.999
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={price4}
                  onCheckedChange={setPrice4}
                >
                  {`> Rp 1.000.000`}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu onOpenChange={() => toggleDropdown(3)}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-between px-2 text-white"
                >
                  Jarak
                  <IoIosArrowDown
                    className="mr-2 h-4 w-4"
                    style={{
                      transition: "transform 0.5s",
                      transform: `rotate(${dropdown3}deg)`, // Menggunakan nilai state untuk rotasi ikon
                    }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <DropdownMenuLabel>Jarak</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={distance1}
                  onCheckedChange={setDistance1}
                >
                  0 - 1 KM
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={distance2}
                    onCheckedChange={setDistance2}
                >
                  1,1 KM - 2 KM
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={distance3}
                    onCheckedChange={setDistance3}
                >
                  2,1 KM - 4 KM
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={distance4}
                    onCheckedChange={setDistance4}
                >
                  {`> 4 KM`}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardProduct style="w-4/5 px-6" />
      </div>
    </main>
  );
};

export default Search;
