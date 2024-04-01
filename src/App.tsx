import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home.tsx";
import NotFound from "./pages/notfound.tsx";
import Login from "./pages/auth/login.tsx";
import Register from "./pages/auth/register.tsx";
import Reset from "./pages/auth/reset.tsx";
import ResetConfirm from "./pages/auth/resetconfirm.tsx";
import Verify from "./pages/auth/verify.tsx";
import Chat from "./pages/chat/chat.tsx";
import ChatToSeller from "./pages/chat/chatseller.tsx";
import ChatToBuyer from "./pages/chat/chatbuyer.tsx";
import DetailProduct from "./pages/detailproduct.tsx";
import Profile from "./pages/profile.tsx";
import Transaction from "./pages/transaction.tsx";
import Search from "./pages/search.tsx";
import AuthRoute from "./routes/AuthRoute.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <AuthRoute />,
    children: [
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
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/chat/toseller/:id",
        element: <ChatToSeller />,
      },
      {
        path: "/chat/tobuyer/:id",
        element: <ChatToBuyer />,
      },
      {
        path: "/product/:id",
        element: <DetailProduct />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
    ],
  },
]);

export default router;
