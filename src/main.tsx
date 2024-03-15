import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home.tsx";
import NotFound from "./pages/notfound.tsx";
import Login from "./pages/auth/login.tsx";
import Register from "./pages/auth/register.tsx";
import Reset from "./pages/auth/reset.tsx";
import ResetConfirm from "./pages/auth/resetconfirm.tsx";
import { AddressProvider } from "./context/AddressContext.tsx";
import Verify from "./pages/auth/verify.tsx";
import { Toaster } from "./components/ui/toaster";
import Search from "./pages/search.tsx";
import { UserProvider } from "./context/RegisterContext.tsx";
import { AuthProvider } from "./context/LoginContext";
import Chat from "./pages/chat.tsx";
import ChatToSeller from "./pages/chatseller.tsx";
import ChatToBuyer from "./pages/chatbuyer.tsx";
import DetailProduct from "./pages/detailproduct.tsx";
import { ProductDataProvider } from "./context/SearchContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/resetconfirm/:token",
    element: <ResetConfirm />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/chat/buy/:id",
    element: <ChatToSeller />,
  },
  {
    path: "/chat/sell/:id",
    element: <ChatToBuyer />,
  },
  {
    path: "/product/:id",
    element: <DetailProduct />,
  },
]);

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
