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
  ];
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
        <main className="fixed left-0 right-0 top-0 z-20 mx-auto flex min-h-screen flex-col items-center justify-center">
          <Carousel className="absolute z-10 w-full max-w-[800px] rounded-xl bg-white p-4">
            <div className="flex w-full justify-end">
              <IoIosCloseCircle
                size={36}
                color="#0F172A"
                onClick={CloseLanding}
                className="cursor-pointer"
              />
            </div>
            <h1 className="mb-7 text-center text-2xl font-bold text-[#0F172A]">
              Selamat Datang
            </h1>
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-3">
                      <img
                        className="max-h-[300px]"
                        src={img[index]}
                        alt="img"
                      />
                      {index < 3 ? (
                        <>
                          <p className="mt-3 text-xl font-bold text-[#0F172A]">
                            {feature[index]}
                          </p>
                          <p>{description[index]}</p>
                        </>
                      ) : (
                        <>
                          <p className="mt-3 font-bold text-[#0F172A]">
                            {feature[index]}
                          </p>
                          <Link to="register">
                            <Button>Mulai</Button>
                          </Link>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  <div className="mt-7 flex items-center justify-center">
                    {[0, 1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className={`mx-1.5 h-2 w-2 rounded-full ${
                          index === item ? "bg-[#0F172A]" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-14 w-14" />
            <CarouselNext className="h-14 w-14" />
          </Carousel>
          <div className="relative min-h-screen w-full bg-slate-800/40 backdrop-blur-[3px]"></div>
        </main>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Landing;
