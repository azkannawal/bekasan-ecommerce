import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider} from "react-router-dom";
import { AddressProvider } from "./context/AddressContext.tsx";
import { UserProvider } from "./context/RegisterContext.tsx";
import { AuthProvider } from "./context/LoginContext";
import { ProductDataProvider } from "./context/SearchContext.tsx";
import { Toaster } from "./components/ui/toaster";
import router from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductDataProvider>
        <UserProvider>
          <AddressProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AddressProvider>
        </UserProvider>
      </ProductDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
