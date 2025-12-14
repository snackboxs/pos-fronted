import MyCard from "./MyCard";
import { useSelector } from "react-redux";
// import { fetchMenus, productData } from "../../features/data/dataSlice";
import { fetchMenus, selectCardData } from "@/features/data/backendDataSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { auth } from "@/features/auth/authCheck";

export default function CardContainer() {
   const dispatch = useAppDispatch();
   // const isAuth = useAppSelector(auth);
   const { menuList, status, error, page, size } = useAppSelector(selectCardData);
   // console.log(menuList);

   // useEffect(() => {
   //    if (status === "idle") {
   //       console.log(`Dispatching initial menu data fetch for page ${page}`);

   //       // Dispatch the thunk using the current page/size from the Redux state
   //       dispatch(fetchMenus({ page, size }));
   //    }
   // }, [dispatch, status, page, size, isAuth]);

   useEffect(() => {
      if (status === "idle") {
         dispatch(fetchMenus({ scope: "card", page, size }));
      }
   }, [status, page, size]);

   if (status === "loading") {
      return (
         <div className="mt-5 text-center p-10 text-xl font-semibold text-blue-500">
            Loading menu items... ⏳
         </div>
      );
   }

   if (status === "failed") {
      return (
         <div className="mt-5 text-center p-10 text-red-600">
            Error fetching data: {error} ❌
         </div>
      );
   }

   // Handle case where fetch succeeded but no items were returned
   if (status === "succeeded" && menuList.length === 0) {
      return (
         <div className="mt-5 text-center p-10 text-gray-500">
            No menu items found for the current selection.
         </div>
      );
   }
   return (
      <div className="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 flex-1">
         {menuList.map((data) => {
            return <MyCard key={data.menuId} data={data} />;
         })}
      </div>
   );
}
