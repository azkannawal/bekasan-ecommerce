import React, { ReactNode, createContext, useContext, useState } from "react";

type ProductData = {
  product_id: string;
  product_name: string;
  product_price: number;
  owner_name: string;
  owner_distance: number;
  url_photo_product: string;
};

interface ProductDataContextType {
  productData: ProductData[] | null;
  savedQuery: string | null;
  setProductData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
  setSavedQuery: (query: string) => void;
}

type Props = {
  children: ReactNode;
};

const ProductDataContext = createContext<ProductDataContextType>({
  savedQuery: null,
  setSavedQuery: () => {},
  productData: null,
  setProductData: () => {},
});

export const useProductData = () => useContext(ProductDataContext);

export const ProductDataProvider = ({ children }: Props) => {
  const [productData, setProductData] = useState<ProductData[] | null>(null);
  const [savedQuery, setSavedQuery] = useState<string | null>(null);
  return (
    <ProductDataContext.Provider
      value={{ productData, savedQuery, setSavedQuery, setProductData }}
    >
      {children}
    </ProductDataContext.Provider>
  );
};
