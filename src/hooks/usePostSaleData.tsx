import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { auth } from "@/features/auth/authCheck";
import { createSaleData } from "@/api/sale.api";
import { logoutUser } from "@/features/auth/authCheck";
import toast from "react-hot-toast";
import type { SaleRequest } from "@/types/sale.types";
import { Check, CircleX } from "lucide-react";

export const UsePostSaleData = () => {
   const isAuth = useAppSelector(auth);
   const dispatch = useAppDispatch();

   return useMutation<SaleRequest, Error, SaleRequest>({
      mutationFn: async (body: SaleRequest) => {
         if (!isAuth.token) {
            throw new Error("Unauthorized");
         }
         console.log("token fine");
         
         return await createSaleData(isAuth.token, body);
      },
      onSuccess: () => {
         toast("Done", {
            icon: <Check />,
            duration: 3000,
            position: "top-center",
            style: { color: "green" },
         });
      },

      onError: (error: Error) => {
         toast("Error", {
            icon: <CircleX />,
            duration: 3000,
            position: "top-center",
            style: { color: "red" },
         });
         if (error.message === "Unauthorized") {
            dispatch(logoutUser());
         }
      },
   });
};
