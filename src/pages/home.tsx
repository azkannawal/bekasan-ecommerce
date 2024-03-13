import Landing from "./../components/fragments/Landing";
import CardProduct from "../components/fragments/CardProduct";
import Navbar from "./../components/fragments/Navbar";
const Home = () => {
  const verify = false;
  return (
    <div className="relative">
      {!verify ? <Landing /> : null}
      <Navbar />
      <div className="relative">
        <CardProduct style="w-full" />
      </div>
    </div>
  );
};

export default Home;
