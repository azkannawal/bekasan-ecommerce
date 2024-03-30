import { ReactNode } from "react";
import Navbar from "./../fragments/Navbar";

type Props = {
  children: ReactNode;
}

const AddNavbar = ({ children }: Props) => {
  return (
    <main className="relative">
      <Navbar />
      {children}
    </main>
  );
};

export default AddNavbar;
