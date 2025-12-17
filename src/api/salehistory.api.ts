import type { SaleHistoryResponse } from "@/types/salehistory.types";

export const fetchSaleData = async (token: string): Promise<SaleHistoryResponse> => {
   const res = await fetch(`/api/cashier/sales`, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   if (!res.ok) {
      const error = new Error("Failed to fetch categories") as any;
      error.status = res.status;
      throw error;
   }

   const result = await res.json();
   return result.data;
};
