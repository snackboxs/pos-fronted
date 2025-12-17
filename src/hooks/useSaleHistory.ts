import { useQuery } from "@tanstack/react-query";
import { auth } from "@/features/auth/authCheck";
import type { SaleHistoryResponse } from "@/types/salehistory.types";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { logoutUser } from "@/features/auth/authCheck";
import { fetchSaleData } from "@/api/salehistory.api";

export const useSaleHistory = () => {
   const isAuth = useAppSelector(auth);
   const dispatch = useAppDispatch();

   return useQuery<SaleHistoryResponse>({
      queryKey: ["saledata"],
      queryFn: async () => {
         try {
            return await fetchSaleData(isAuth.token);
         } catch (error: any) {
            console.log("Error status:", error.status);
            if (error.status === 401) {
               dispatch(logoutUser());
            }
            throw error;
         }
      },
      enabled: !!isAuth.token,
   });
};
