// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../store.ts";
// import { getCookie, setCookie } from "../../utils/cookieUtils.ts"; 

// const PAGE_COOKIE_NAME = "activePageName"; 
// const DEFAULT_PAGE = "Home"; 

// interface PageState {
//   currentPage: string;
// }

// const initialState: PageState = {
//   // getCookie ကိုသုံးပြီး တန်ဖိုးကို ဖတ်ပါ။ မရှိရင် DEFAULT_PAGE ကို ယူပါ။
//   currentPage: getCookie(PAGE_COOKIE_NAME) || DEFAULT_PAGE, 
// };


// export const pageSlice = createSlice({
//   name: "activePage",
//   initialState,
//   reducers: {
//     setActivePage: (state, action: PayloadAction<string>) => {
//       state.currentPage = action.payload;
      
//       // ၄။ state ပြောင်းတိုင်း Cookie ကိုပါ update လုပ်ခြင်း
//       setCookie(PAGE_COOKIE_NAME, action.payload, 30); 
//     },
    
//     // to delete cookie
//     clearActivePage: (state) => {
//       state.currentPage = DEFAULT_PAGE;
//       // max-age=0 နဲ့ သတ်မှတ်ပြီး ဖျက်လိုက်ခြင်း
//       setCookie(PAGE_COOKIE_NAME, "", 0); 
//     }
//   },
// });

// export const { setActivePage, clearActivePage } = pageSlice.actions;

// export const selectCurrentPage = (state: RootState) => state.activePage.currentPage;

// export default pageSlice.reducer;

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