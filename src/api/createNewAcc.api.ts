import type { SignUpFormInputs } from "@/pages/CreateNewAcc";

export const signUp = async (data: SignUpFormInputs) => {
   const res = await fetch(`/api/admin/user/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   if (!res.ok) {
      const error = new Error("Failed to fetch categories") as any;
      error.status = res.status;
      throw error;
   }

   const result = await res.json();
   console.log(result);
   
   return result;
};
