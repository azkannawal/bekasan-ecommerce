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

const categories = [
  { name: "Sepatu", state: useState<Checked>(false) },
  { name: "Tas", state: useState<Checked>(false) },
  { name: "Lemari", state: useState<Checked>(false) },
];

const prices = [
  { name: "Rp 0 - Rp 249.999", state: useState<Checked>(false) },
  { name: "Rp 250.000 - Rp 499.999", state: useState<Checked>(false) },
  { name: "Rp 500.000 - Rp 999.999", state: useState<Checked>(false) },
  { name: "> Rp 1.000.000", state: useState<Checked>(false) },
];

const distances = [
  { name: "0 - 1 KM", state: useState<Checked>(false) },
  { name: "1,1 KM - 2 KM", state: useState<Checked>(false) },
  { name: "2,1 KM - 4 KM", state: useState<Checked>(false) },
  { name: "> 4 KM", state: useState<Checked>(false) },
];

const Search = () => {
  const [dropdowns, setDropdowns] = useState([0, 0, 0]);

  const toggleDropdown = (index: number): void => {
    setDropdowns((prevDropdowns) => {
      const newDropdowns = [...prevDropdowns];
      newDropdowns[index] = newDropdowns[index] === 0 ? 180 : 0;
      return newDropdowns;
    });
  };

  return (
    <main className="overflow-visible">
      <Navbar />
      <div className="flex">
        <div className="w-1/5 bg-[#135699]">
          <div className="flex flex-col fixed gap-4 pt-24 px-6 w-1/5">
            <h1 className="text-2xl font-bold text-white px-2">Filter</h1>

            {categories.map((item, index) => (
              <DropdownMenu
                key={index}
                onOpenChange={() => toggleDropdown(index)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between px-2 text-white"
                  >
                    {item.name}
                    <IoIosArrowDown
                      className="mr-2 h-4 w-4"
                      style={{
                        transition: "transform 0.5s",
                        transform: `rotate(${dropdowns[index]}deg)`,
                      }}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={item.state[0]}
                    onCheckedChange={item.state[1]}
                  >
                    {item.name}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            {prices.map((item, index) => (
              <DropdownMenu
                key={index}
                onOpenChange={() => toggleDropdown(index)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between px-2 text-white"
                  >
                    {item.name}
                    <IoIosArrowDown
                      className="mr-2 h-4 w-4"
                      style={{
                        transition: "transform 0.5s",
                        transform: `rotate(${dropdowns[index]}deg)`,
                      }}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={item.state[0]}
                    onCheckedChange={item.state[1]}
                  >
                    {item.name}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            {distances.map((item, index) => (
              <DropdownMenu
                key={index}
                onOpenChange={() => toggleDropdown(index)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="justify-between px-2 text-white"
                  >
                    {item.name}
                    <IoIosArrowDown
                      className="mr-2 h-4 w-4"
                      style={{
                        transition: "transform 0.5s",
                        transform: `rotate(${dropdowns[index]}deg)`,
                      }}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                  <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={item.state[0]}
                    onCheckedChange={item.state[1]}
                  >
                    {item.name}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
        <CardProduct style="w-4/5 px-6" />
      </div>
    </main>
  );
};

export default Search;
