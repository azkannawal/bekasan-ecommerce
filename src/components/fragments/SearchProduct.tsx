import { useProductData } from "@/context/SearchContext";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const { productData } = useProductData();

  return (
    <div className="grid grid-cols-3 pt-[110px] gap-12 px-12 mb-16">
      {productData!.map((item) => (
        <Link to={`/product/${item.product_id}`} key={item.product_id}>
          <div className="flex flex-col gap-y-2 max-w-96">
            <img src={item.url_photo_product} alt="img" className="pb-1" />
            <h1 className="text-xl font-bold">{item.product_name}</h1>
            <h2 className="font-medium text-[#135699]">
              Rp {item.product_price}
            </h2>
            <div className="flex justify-between">
              <h3>{item.owner_name}</h3>
              <h3>{parseFloat(item.owner_distance).toFixed(1)} KM</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchProduct;
