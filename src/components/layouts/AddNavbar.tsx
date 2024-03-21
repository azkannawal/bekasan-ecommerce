import { ReactNode } from "react";
import Navbar from "./../fragments/Navbar";

interface AddNavbarProps {
  children: ReactNode;
}

const AddNavbar: React.FC<AddNavbarProps> = ({ children }) => {
  return (
    <main className="relative">
      <Navbar />
      {children}
    </main>
  );
};

export default AddNavbar;
