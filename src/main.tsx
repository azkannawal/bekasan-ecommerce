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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <AddressProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AddressProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
