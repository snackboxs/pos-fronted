import { createSlice } from "@reduxjs/toolkit";
import { deleteMenu } from "./dataThunks";

interface MenuDeleteState {
   status: "idle" | "loading" | "success" | "error";
   error?: string | null;
}

const initialState: MenuDeleteState = {
   status: "idle",
   error: null,
};

export const datleHandleSlice = createSlice({
   name: "dataHandle",
   initialState,
   reducers: {
      resetStatus: (state) => {
         state.status = "idle";
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
      .addCase(deleteMenu.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Unknown error";
      });
   }
});


export const { resetStatus } = datleHandleSlice.actions;
export default datleHandleSlice.reducer;