import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks";
import { auth } from "@/features/auth/authCheck";
import { fetchAllCategory } from "@/api/category.api";
import type { Category } from "../types/category.types";
import { useAppDispatch } from "@/hooks";
import { logoutUser } from "@/features/auth/authCheck";

export const useCategory = () => {
   const isAuth = useAppSelector(auth);
   const dispatch = useAppDispatch();

   return useQuery<Category[]>({
      queryKey: ["category"],
      queryFn: async () => {
         try {
            return await fetchAllCategory(isAuth.token);
         } catch (error: any) {
            // အကယ်၍ 401 (Unauthorized) ဖြစ်ခဲ့ရင် logout လုပ်မယ်
            if (error.status === 401) {
               dispatch(logoutUser());
            }
            throw error;
         }
      },
      enabled: !!isAuth.token,
   });
};
