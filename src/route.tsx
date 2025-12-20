import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

import Home from "./pages/Home";
import ShowItems from "./pages/ShowItems";
import AdminDashboard from "@/pages/AdiminDashboard";
import Stock from "./pages/Stock";
import Login from "./pages/Login";
import AddNewItem from "./pages/AddNewItem";

export const router = createBrowserRouter([
   {
      path: "/login",
      Component: Login,
   },
   {
      path: "/",
      Component: Home,
      children: [
         // Everyone can see ShowItems
         { path: "/", Component: ShowItems },

         // ADMIN-only pages
         {
            path: "/admin/dashboard",
            Component: () => (
               <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
               </ProtectedRoute>
            ),
         },
         {
            path: "/stock",
            Component: () => (
               <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <Stock />
               </ProtectedRoute>
            ),
         },
         {
            path: "/addnewitm",
            Component: () => (
               <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AddNewItem />
               </ProtectedRoute>
            ),
         },
      ],
   },
]);


