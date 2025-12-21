
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";

const DEFAULT_PAGE = "Home"; 

interface PageState {
  currentPage: string;
}

const initialState: PageState = {
  currentPage: DEFAULT_PAGE, 
};


export const pageSlice = createSlice({
  name: "activePage",
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    
    // to delete cookie
    clearActivePage: (state) => {
      state.currentPage = DEFAULT_PAGE;
    }
  },
});

export const { setActivePage, clearActivePage } = pageSlice.actions;

export const selectCurrentPage = (state: RootState) => state.activePage.currentPage;

export default pageSlice.reducer;