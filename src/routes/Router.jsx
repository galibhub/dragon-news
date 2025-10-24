import { createBrowserRouter } from "react-router";
import Homelayouts from "../layouts/Homelayouts";
import Home from "../pages/Home";
import CategoryNews from "../pages/CategoryNews";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import NewsDetails from "../pages/NewsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayouts></Homelayouts>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "category/:id",
        element: <CategoryNews></CategoryNews>,
        loader: () => fetch("/news.json"),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element:<Register></Register>,
      },
    ],
  },
  {
    path: "/news-details/:id",
    element: <NewsDetails></NewsDetails>,
    loader:()=>fetch('/news.json')
  },
  {
    path: "/*",
    element: <h2>Error-404</h2>,
  },
]);

export default router;
