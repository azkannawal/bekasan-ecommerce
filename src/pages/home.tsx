import Landing from "./../components/fragments/Landing";
import CardProduct from "../components/fragments/CardProduct";
import Navbar from "./../components/fragments/Navbar";
const Home = () => {
  return (
    <div className="relative">
      <Landing />
      <div className="relative">
        <Navbar />
        <CardProduct />
      </div>
    </div>
  );
};

export default Home;
