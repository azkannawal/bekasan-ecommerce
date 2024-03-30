import { ReactNode } from "react";
import HeaderAuth from "../fragments/HeaderAuth";

type Props = {
  children: ReactNode;
  title: string;
}

const AddHeaderAuth = ({ children, title }: Props) => {
  return (
    <main>
      <HeaderAuth title={title} />
      {children}
    </main>
  );
};

export default AddHeaderAuth;
