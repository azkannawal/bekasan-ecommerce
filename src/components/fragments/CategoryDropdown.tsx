import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  handleSearch: (category: string, sort: string) => void;
};

const CategoryDropdown = ({ handleSearch }: Props) => {
  const [dropdown1, setDropdown1] = useState(0);
  const [position, setPosition] = useState("");

  const toggleDropdown = (): void => {
    setDropdown1((prevState) => (prevState === 0 ? 180 : 0));
  };

  return (
    <DropdownMenu onOpenChange={toggleDropdown}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="justify-between px-2 text-white">
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
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            value="a"
            onClick={() => handleSearch("pakaian dan aksesoris", "")}
          >
            Pakaian dan Aksesoris
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              handleSearch("kesehatan dan kecantikan", "");
            }}
            value="b"
          >
            Kesehatan dan Kecantikan
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              handleSearch("perabotan dan dekorasi kamar", "");
            }}
            value="c"
          >
            Perabotan dan Dekorasi kamar
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              handleSearch("kendaraan", "");
            }}
            value="d"
          >
            Kendaraan
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              handleSearch("perlengkapan kuliah", "");
            }}
            value="e"
          >
            Perlengkapan Kuliah
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              handleSearch("alat tulis dan perlengkapan kantor", "");
            }}
            value="f"
          >
            Alat Tulis dan Perlengkapan Kantor
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              handleSearch("elektronik", "");
            }}
            value="g"
          >
            Elektronik
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              handleSearch("buku dan bahan ajar", "");
            }}
            value="h"
          >
            Buku dan Bahan Ajar
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
