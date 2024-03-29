import { Card, CardContent } from "@/components/ui/card";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Landing = () => {
  const [hide, setHide] = useState(true);
  const img = [
    "landingpage01.png",
    "landingpage02.png",
    "landingpage03.png",
    "landingpage04.png",
  ]
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
        <main className="flex flex-col min-h-screen justify-center items-center fixed right-0 left-0 top-0 z-20">
          <Carousel className="w-full max-w-4xl bg-white rounded-xl p-4 absolute z-10">
            <div className="flex justify-end w-full">
              <IoIosCloseCircle
                size={36}
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
                        src={img[index]}
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
                          <Link to="register">
                            <Button>Mulai</Button>
                          </Link>
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
          <div className="bg-slate-800/40 w-full min-h-screen backdrop-blur-md relative"></div>
        </main>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Landing;
