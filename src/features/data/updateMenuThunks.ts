import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { MenuData } from "@/types/backendData.types";
import { auth } from "../auth/authCheck";

interface UpdateMenuPayload {
   menuId: string;
   data: {
      menuName: string;
      price: number;
      categoryId: string;
      description: string;
      quantity: number;
      uom: string;
   };
}

export const updateMenu = createAsyncThunk<
   MenuData,
   UpdateMenuPayload,
   { rejectValue: string; state: RootState }
>("menu/updateMenu", async ({ menuId, data }, thunkAPI) => {
   try {
      const token = auth(thunkAPI.getState()).token;

      const response = await fetch(`/api/admin/menu/${menuId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(data),
      });

      if (!response.ok) {
         const errorData = await response.json();
         return thunkAPI.rejectWithValue(
            errorData.message || "Update menu failed"
         );
      }

      const res: MenuData = await response.json();
      return res;
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
   }
});
