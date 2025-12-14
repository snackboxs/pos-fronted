import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ShowItems from "./pages/ShowItems";
import AdminDashboard from "./pages/AdiminDashboard";
import EditItem from "../src/pages/EditItem";
import Stock from "./pages/Stock";
import Login from "./pages/Login";
import AddNewItem from "./pages/AddNewItem";

const router = createBrowserRouter([
   {
      path: "/login",
      Component: Login,
   },
   {
      path: "/",
      Component: Home,
      children: [
         {
            path: "/",
            Component: ShowItems,
         },
         {
            path: "/admin/dashboard",
            Component: AdminDashboard,
         },
         {
            path: "/edititem/:id",
            Component: EditItem,
         },
         {
            path: "/stock",
            Component: Stock,
         },
         {
            path: "/addnewitm",
            Component: AddNewItem,
         },
      ],
   },
]);

export default router;
