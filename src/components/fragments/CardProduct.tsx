import { Link } from "react-router-dom";

const CardProduct = () => {
  const name = [
    "Tas",
    "Lemari Penyimpanan",
    "Sepatu",
    "Payung",
    "Baju",
    "Celana Panjang",
    "Celana Pendek",
    "Sandal",
  ];
  return (
    <main className="flex flex-col justify-center items-center relative z-1 pb-12">
      <h1 className="self-start mt-24 pt-8 pb-8 px-12 font-bold text-3xl text-[#0F172A]">
        Kategori
      </h1>
      <div className="grid grid-cols-4 gap-x-32 gap-y-14 ">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div className="flex flex-col text-center gap-2" key={index}>
            <Link to="/register">
              <img
                className="w-60 rounded-lg"
                src={`product0${index + 1}.png`}
                alt={`img`}
              />
            </Link>
            <p className="text-xl font-semibold text-[#0F172A]">
              {name[index]}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CardProduct;
