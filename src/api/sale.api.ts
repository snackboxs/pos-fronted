import api from "@/lib/api";
import type { SaleRequest } from "@/types/sale.types";

export const createSaleData = async (
   token: string,
   body: SaleRequest
): Promise<SaleRequest> => {
   try {
      const res = await api.post("/cashier/sales", body, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      console.log(res.data, "hello rea");
      return res.data;
   } catch (err: any) {
      throw new Error(err.response?.data?.message || "Create sale failed");
   }
};
