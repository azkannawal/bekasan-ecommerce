type Props = {
  title: string;
};

const HeaderAuth = ({ title }: Props) => {
  return (
    <nav className="absolute z-10 flex w-full items-center bg-white px-4">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-6 px-[calc(3.5vw+5px)]">
        <img
          className="w-[60px]"
          src="https://i.ibb.co.com/MVJKSgy/logo-bekasan.png"
          alt="img"
        />
        <h1 className="text-2xl font-bold capitalize text-[#0F172A]">
          {title}
        </h1>
      </div>
    </nav>
  );
};

export default HeaderAuth;
