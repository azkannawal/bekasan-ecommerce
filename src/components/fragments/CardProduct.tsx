const CardProduct = () => {
  return (
    <main className="flex flex-col justify-center items-center relative -z-10">
      <h1 className="self-start mt-24 pt-8 pb-6 px-12 font-bold text-3xl text-[#0F172A]">
        Kategori
      </h1>
      <div className="grid grid-cols-4 gap-x-32 gap-y-14 ">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
          <div className="flex flex-col text-center gap-2">
            <img
              key={index}
              className="w-60 rounded-lg"
              src={`product0${1}.png`}
              alt={`img`}
            />
            <p className="text-xl font-semibold text-[#0F172A]">Tas</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CardProduct;
