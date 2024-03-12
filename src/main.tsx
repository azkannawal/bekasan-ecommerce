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
import { UserProvider } from "./context/UserContext.tsx";
import Verify from "./pages/auth/verify.tsx";
import { Toaster } from "./components/ui/toaster";

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
    path: "/register/verify",
    element: <Verify />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/resetconfirm",
    element: <ResetConfirm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserProvider>
  </React.StrictMode>
);
