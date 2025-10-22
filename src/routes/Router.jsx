import { createBrowserRouter } from "react-router";
import Homelayouts from "../layouts/Homelayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayouts></Homelayouts>,
  },
  {
    path: "/auth",
    element: <h2>Authentication layout</h2>
  },
  {
    path: "/news",
    element: <h2>News layout</h2>
  },
  {
    path: "/*",
    element: <h2>Error404</h2>
  },
]);

export default router;