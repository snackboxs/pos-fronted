import { createSlice } from "@reduxjs/toolkit";
import { deleteMenu } from "./deleMenuThunks";
import { updateMenu } from "./updateMenuThunks";
import { setStatusIdle } from "./backendDataSlice";
import type { MenuData } from "@/types/backendData.types";
import type { RootState } from "@/store";

interface DataHandleState {
   menuList: MenuData[];
   page: number;
   size: number;
   totalElements: number;
   totalPages: number;
   status: {
      delete: "idle" | "loading" | "succeeded" | "failed";
      update: "idle" | "loading" | "succeeded" | "failed";
   };
   error: {
      delete: string | null;
      update: string | null;
   };
   selectedMenuId: string | null;
   tempMenuData: MenuData | null;
}

const initialState: DataHandleState = {
  menuList: [],
  page: 1,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  status: {
    delete: "idle",
    update: "idle",
  },
  error: {
    delete: null,
    update: null,
  },
  selectedMenuId: null,
  tempMenuData: null,
};


export const datleHandleSlice = createSlice({
   name: "dataHandle",
   initialState,
   reducers: {
    resetStatus: (state) => {
      state.status.delete = "idle";
      state.status.update = "idle";
      state.error.delete = null;
      state.error.update = null;
    },
    setSelectedMenu: (state, action) => {
      state.selectedMenuId = action.payload.menuId;
      state.tempMenuData = action.payload.tempMenuData;
    },
    clearSelectedMenu: (state) => {
      state.selectedMenuId = null;
      state.tempMenuData = null;
    },
  },
   extraReducers: (builder) => {
    builder
      // DELETE
      .addCase(deleteMenu.pending, (state) => {
        state.status.delete = "loading";
        state.error.delete = null;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.status.delete = "succeeded";
        state.selectedMenuId = null;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.status.delete = "failed";
        state.error.delete = action.payload ?? "Unknown delete error";
      })

      //UPDATE
      .addCase(updateMenu.pending, (state) => {
        state.status.update = "loading";
        state.error.update = null;
      })
      .addCase(updateMenu.fulfilled, (state) => {
        state.status.update = "succeeded";
        state.selectedMenuId = null;
        state.tempMenuData = null;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.status.update = "failed";
        state.error.update = action.payload ?? "Unknown update error";
      });
  },
});

export const { resetStatus } = datleHandleSlice.actions;
export const dataHandle = (state: RootState) => state.dataHandle
export default datleHandleSlice.reducer;
