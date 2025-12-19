import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { MenuData, Status } from "@/types/backendData.types";
import { fetchMenuById } from "./fetchMenuByIdThunks";

interface FetchMenuByIdState {
   data: MenuData[];
   status: Status;
   error: string | null;
}

const initialState: FetchMenuByIdState = {
   data: [],
   status: "idle",
   error: null,
};

export const fetchMenuIdSlice = createSlice({
   name: "fetchMenuId",
   initialState,
   reducers: {
      clearMenuDetail: (state) => {
         state.data = [];
         state.status = "idle";
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchMenuById.pending, (state) => {
            state.status = "loading";
            state.error = null;
         })
         .addCase(fetchMenuById.fulfilled, (state, action) => {
            state.status = "succeeded";
            const newMenu = action.payload.data;

            state.data = [
               ...state.data.filter((item) => item.menuId !== newMenu.menuId),
               newMenu,
            ];
         })
         .addCase(fetchMenuById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload ?? "Unknown error";
         });
   },
});

export const { clearMenuDetail } = fetchMenuIdSlice.actions;
export const fetchMenuByIdData = (state: RootState) =>
   state.fetchMenuByIdData.data;
export default fetchMenuIdSlice.reducer;
