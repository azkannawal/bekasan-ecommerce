interface Props {
  title: string;
}

const HeaderAuth: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex items-center gap-4 absolute w-full z-10 px-4 bg-white">
      <img className="w-[80px]" src="/src/assets/logo.png" alt="img" />
      <h1 className="uppercase font-bold text-2xl text-[#0F172A]">{title}</h1>
    </div>
  );
};

export default HeaderAuth;
