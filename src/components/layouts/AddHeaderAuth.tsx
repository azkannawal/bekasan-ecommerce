import React, { ReactNode } from "react";
import HeaderAuth from "../fragments/HeaderAuth";

interface AddHeaderAuthProps {
  children: ReactNode;
  title: string;
}

const AddHeaderAuth: React.FC<AddHeaderAuthProps> = ({ children, title }) => {
  return (
    <main>
      <HeaderAuth title={title}/>
      {children}
    </main>
  );
};

export default AddHeaderAuth;
