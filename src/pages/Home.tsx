import { Outlet, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import { useAppSelector } from "@/hooks";
import { auth } from "@/features/auth/authCheck";

export default function Home() {
   const isAuth = useAppSelector(auth);
   if (!isAuth.isAuthenticate) {
      return <Navigate to="/login" replace />;
   }
   return (
      <>
         <div>
            <div>
               <Dashboard>
                  <Outlet />
               </Dashboard>
            </div>
         </div>
      </>
   );
}
