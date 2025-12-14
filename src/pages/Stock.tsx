import { useAppSelector, useAppDispatch } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import style from "../css/stockStyle.module.css";
import type { MenuData } from "@/types/backendData.types";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { selectStockData } from "@/features/data/backendDataSlice";
import {
   fetchMenus,
   setPaginationParams,
} from "@/features/data/backendDataSlice";
import { useDashboardContext } from "@/components/react/DashboardProvider";

export default function Stock() {
   const dispatch = useAppDispatch();
   const [data, setData] = useState<MenuData[]>([]);

   const { menuList, page, size, status } = useAppSelector(selectStockData);

   useEffect(() => {
      if (status === "idle") {
         dispatch(fetchMenus({ scope: "stock", page, size }));
      }
   }, [status, page, size]);

   const handleMore = () => {
      dispatch(setPaginationParams({ scope: "stock", page: page + 1 }));
   };
   return (
      <>
         <table className="mt-5 border-collapse border border-gray-400 table-fixed">
            <thead>
               <tr>
                  {/* <th className="border border-gray-300"></th> */}
                  <th className="border border-gray-300" colSpan={2}>
                     Product
                  </th>
                  <th className="border border-gray-300">In Stock</th>
                  <th className="border border-gray-300">Category</th>
                  <th className="border border-gray-300">Price</th>
               </tr>
            </thead>
            <tbody>
               {menuList.map((data) => (
                  <tr key={data.menuId}>
                     <td className="border border-gray-300">
                        <img src={data.imageUrl} alt="" />
                     </td>
                     <td className="border border-gray-300">{data.menuName}</td>
                     <td className="border border-gray-300">
                        {data.inventory.quantity}
                     </td>
                     <td className="border border-gray-300">
                        {data.category.categoryName}
                     </td>
                     <td className="border border-gray-300">{data.price}$</td>
                  </tr>
               ))}
            </tbody>
         </table>
         {status === "loading" ? (
            <Spinner className="mx-auto mt-4" />
         ) : (
            <Button
               className="w-30 mx-auto mt-4 cursor-pointer"
               variant="outline"
               onClick={() => handleMore()}
            >
               More
            </Button>
         )}
      </>
   );
}
