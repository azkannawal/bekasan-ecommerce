import React, { ReactNode, createContext, useContext, useState } from "react";

interface ProductData {
  product_id: string;
  product_name: string;
  product_price: string;
  owner_name: string;
  owner_distance: string;
  url_photo_product: string;
}

interface ProductDataContextType {
  productData: ProductData[] | null;
  setProductData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
}

const ProductDataContext = createContext<ProductDataContextType>({
  productData: null,
  setProductData: () => {},
});

interface ProductDataProviderProps {
  children: ReactNode;
}

export const useProductData = () => useContext(ProductDataContext);

export const ProductDataProvider: React.FC<ProductDataProviderProps> = ({
  children,
}) => {
  const [productData, setProductData] = useState<ProductData[] | null>(null);

  return (
    <ProductDataContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductDataContext.Provider>
  );
};