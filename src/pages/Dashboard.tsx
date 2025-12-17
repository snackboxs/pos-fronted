import MenuCard from "../components/react/MenuCard";
import MySidebar from "../components/react/MySidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import Topbar from "../components/react/Topbar";
import type React from "react";
import { selectCurrentPage } from "../features/page/pageSlice";
import { auth } from "@/features/auth/authCheck";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Dashboard({ children }: React.ComponentProps<"div">) {
   const isAuth = useSelector(auth);
   const location = useLocation();

   const isHome = location.pathname === "/";

   return (
      <SidebarProvider>
         <MySidebar />
         <div className="mx-2 flex-1 relative">
            <div className="flex flex-col relative h-full">
               <Topbar />
               {children}
            </div>
         </div>
         {isHome && <MenuCard />}
      </SidebarProvider>
   );
}
