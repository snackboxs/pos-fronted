import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { auth } from "../auth/authCheck";

export const deleteMenu = createAsyncThunk<
   { menuId: string }, // API return value
   string, // Argument (menuId)
   { rejectValue: string; state: RootState }
>("menu/deleteMenu", async (menuId, thunkAPI) => {
   try {
      const token = auth(thunkAPI.getState()).token;

      const response = await fetch(`/api/admin/menu/${menuId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      console.log(response + "delete");

      if (!response.ok) {
         const errorData = await response.json();
         return thunkAPI.rejectWithValue(errorData.message || "Delete failed");
      }

      // const res = await response.json();
      // console.log(res + 'result');

      return { menuId };
   } catch (error: any) {
      return thunkAPI.rejectWithValue(
         error.response?.data?.message || error.message
      );
   }
});
