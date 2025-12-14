import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";

type Theme = "light" | "dark" | "system";

interface ThemeState {
   currentTheme: Theme;
}

const getInitialTheme = (): Theme => {
   const saved = localStorage.getItem("pos-system-theme");
   if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
   }
   return "light";
};

const initialState: ThemeState = {
   currentTheme: getInitialTheme(),
};

export const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      setTheme: (state, action: PayloadAction<Theme>) => {
         state.currentTheme = action.payload;
         localStorage.setItem("pos-system-theme", action.payload);
      },
   },
});

export const { setTheme } = themeSlice.actions;
export const theme = (state: RootState) => state.theme.currentTheme;
export default themeSlice.reducer;
