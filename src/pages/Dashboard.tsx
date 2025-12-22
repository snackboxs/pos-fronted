import MenuCard from "../components/react/MenuCard";
import MySidebar from "../components/react/MySidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import Topbar from "../components/react/Topbar";
import type React from "react";
import { selectCurrentPage } from "../features/page/pageSlice";
import { auth } from "@/features/auth/authCheck";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Dashboard({ children }: React.ComponentProps<"div">) {
   const isAuth = useSelector(auth);
   const location = useLocation();
   const [openMenuCard, setOpenMenuCard] = useState(false);

   const isHome = location.pathname === "/";

   return (
      <SidebarProvider>
         <MySidebar />
         <div className="mx-2 flex-1 relative">
            <div className="flex flex-col relative h-full">
               <Topbar />
               {children}
            </div>
            {isHome && (
               <Button
                  variant="posDefault"
                  className="lg:hidden fixed bottom-25 right-3 z-40"
                  onClick={() => setOpenMenuCard(true)}
               >
                  Sale
               </Button>
            )}
         </div>
         {isHome && <MenuCard className="hidden lg:block" />}
         {isHome && (
            <Dialog open={openMenuCard} onOpenChange={setOpenMenuCard}>
               <DialogContent className="lg:hidden max-w-3xl w-fit rounded-3xl">
                  <MenuCard />
               </DialogContent>
            </Dialog>
         )}
      </SidebarProvider>
   );
}
