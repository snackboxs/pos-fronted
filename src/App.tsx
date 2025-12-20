import { useEffect } from "react";
import { useAppSelector } from "./hooks";
import { RouterProvider, Outlet } from "react-router";
import { router } from "./route";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/react/AuthProvider";

function App() {
   const currentTheme = useAppSelector((state) => state.theme.currentTheme);

   useEffect(() => {
      const htmlElement = document.documentElement;

      htmlElement.classList.remove("light", "dark");

      if (currentTheme === "dark") {
         htmlElement.classList.add("dark");
      } else if (currentTheme === "light") {
         htmlElement.classList.add("light");
      }
   }, [currentTheme]);

   return (
      <AuthProvider>
         <RouterProvider router={router} />
         <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
   );
}

export default App;
