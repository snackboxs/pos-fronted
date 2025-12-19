import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type { MenuData } from "@/types/backendData.types";
import { auth } from "../auth/authCheck";
import { useAppSelector } from "@/hooks";
import type { RootState } from "@/store";

export interface MenuApiResponse {
   data: MenuData;
   message: string;
   status: number;
   timestamp: string;
}

export const fetchMenuById = createAsyncThunk<
   MenuApiResponse,
   string,
   { rejectValue: string; state: RootState }
>("menu/fetchById", async (menuId, { rejectWithValue, getState }) => {
   const state = getState(); // Redux state
   const token = state.auth.token;
   try {
      const res = await api.get(`/admin/menu/${menuId}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      console.log(res.data, "hello rea");
      
      return res.data;
   } catch (err: any) {
      return rejectWithValue(err.message || "Fetch menu failed");
   }
});
