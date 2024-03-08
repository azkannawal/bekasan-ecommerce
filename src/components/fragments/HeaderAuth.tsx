interface NavbarProps {
  title: string;
}

const HeaderAuth: React.FC<NavbarProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 absolute w-full z-10 px-4 py-1 bg-white">
      <img className="w-[80px]" src="./logo.png" alt="img" />
      <h1 className="uppercase font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default HeaderAuth;
