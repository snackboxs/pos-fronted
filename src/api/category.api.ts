// api/category.api.ts
import type { Category } from "@/types/category.types.ts";

export const fetchAllCategory = async (token: string): Promise<Category[]> => {
   const res = await fetch(`/api/admin/category`, {
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

   const json = await res.json();
   return json.data;
};
