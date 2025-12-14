import { Outlet, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import DashboardProvider from "../components/react/DashboardProvider";
import { useAppSelector } from "@/hooks";
import { auth } from "@/features/auth/authCheck";
import { useEffect } from "react";

export default function Home() {
   const isAuth = useAppSelector(auth);

   if (!isAuth.isAuthenticate) {
      return <Navigate to="/login" replace />;
   }
   return (
      <>
         <DashboardProvider>
            <div>
               <div>
                  <Dashboard>
                     <Outlet />
                  </Dashboard>
               </div>
            </div>
         </DashboardProvider>
      </>
   );
}

// // App.tsx ဥပမာ
// import React, { useEffect } from 'react';
// import { useAppDispatch } from './store';
// import { checkAuthStatus } from './authSlice';

// function App() {
//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         // App စတင်ဖွင့်တဲ့အခါ တစ်ကြိမ်သာ ခေါ်ဆိုရန်
//         dispatch(checkAuthStatus());
//     }, [dispatch]);

//     // ... rest of the App
// }
