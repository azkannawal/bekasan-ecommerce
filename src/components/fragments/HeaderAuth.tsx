interface Props {
  title: string;
}

const HeaderAuth: React.FC<Props> = ({ title }) => {
  return (
    <nav className="flex items-center gap-4 absolute w-full z-10 px-4 bg-white">
      <img className="w-[80px]" src="https://i.ibb.co/t87W7vK/logo.png" alt="img" />
      <h1 className="uppercase font-bold text-2xl text-[#0F172A]">{title}</h1>
    </nav>
  );
};

export default HeaderAuth;
