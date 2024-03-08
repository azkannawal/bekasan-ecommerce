import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const Landing = () => {
  const [hide, setHide] = useState(true);
  const feature = [
    "Fitur Jual Beli Barang Bekas",
    "Fitur Jarak Terdekat",
    "Fitur Pesan ke Penjual",
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
          <Carousel className="w-full max-w-4xl bg-white rounded-xl p-5 absolute z-10">
            <h1
              className="uppercase text-center font-bold text-3xl mb-7"
              onClick={CloseLanding}
            >
              Selamat Datang
            </h1>
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-3">
                      <img
                        className="h-96"
                        src={`./landingpage0${index + 1}.png`}
                        alt="img"
                      />
                      <p className="uppercase font-bold text-xl mt-3">
                        {feature[index]}
                      </p>
                      <p className="text-lg">{description[index]}</p>
                    </CardContent>
                  </Card>
                  <div className="flex justify-center items-center mt-7">
                    {[0, 1, 2].map((item) => (
                      <span
                        key={item}
                        className={`w-4 h-4 mx-1.5 rounded-full ${
                          index === item
                            ? "bg-black animate-pulse duration-800"
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
