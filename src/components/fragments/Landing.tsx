import { Card, CardContent } from "@/components/ui/card";
import { IoIosCloseCircle } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Button } from "../ui/button";

const Landing = () => {
  const [hide, setHide] = useState(true);
  const feature = [
    "Fitur Jual Beli Barang Bekas",
    "Fitur Jarak Terdekat",
    "Fitur Pesan ke Penjual",
    "Daftar Sekarang",
  ];
  const description = [
    "Memudahkan Anda dalam menjual atau membeli barang bekas",
    "Memudahkan Anda dalam menemukan barang bekas terdekat",
    "Memudahkan Anda dalam menentukan waktu bertemu untuk COD",
  ];

  const CloseLanding = () => {
    setHide((hide) => !hide);
  };

  return (
    <>
      {hide ? (
        <div className="flex flex-col min-h-screen justify-center items-center fixed right-0 left-0 top-0 z-10">
          <Carousel className="w-full max-w-4xl bg-white rounded-xl p-4 absolute z-10">
            <div className="flex justify-end w-full">
              <IoIosCloseCircle
                size={30}
                color="#0F172A"
                onClick={CloseLanding}
                className="cursor-pointer"
              />
            </div>
            <h1 className="uppercase text-center font-bold text-3xl mb-7 text-[#0F172A]">
              Selamat Datang
            </h1>
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-3">
                      <img
                        className="h-96"
                        src={`./landingpage0${index + 1}.png`}
                        alt="img"
                      />
                      {index < 3 ? (
                        <>
                          <p className="uppercase font-bold text-xl mt-3 text-[#0F172A]">
                            {feature[index]}
                          </p>
                          <p className="text-lg">{description[index]}</p>
                        </>
                      ) : (
                        <>
                          <p className="uppercase font-bold text-xl mt-3 text-[#0F172A]">
                            {feature[index]}
                          </p>
                          <Button>Mulai</Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  <div className="flex justify-center items-center mt-7">
                    {[0, 1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className={`w-4 h-4 mx-1.5 rounded-full ${
                          index === item
                            ? "bg-[#0F172A] animate-pulse duration-800"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className=" h-14 w-14" />
            <CarouselNext className="h-14 w-14" />
          </Carousel>
          <div className="bg-black/10 w-full min-h-screen backdrop-blur-lg relative"></div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Landing;
