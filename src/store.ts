import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./features/theme/themeSlice";
import pageReducer from "./features/page/pageSlice";
import { authCheck } from "./features/auth/authCheck";
import itemSelectedReducer from "./features/itemSelected/itemSelectedSlice";
import { dataSlice } from "./features/data/backendDataSlice";
import { datleHandleSlice } from "./features/data/dataHandleSlice";

export const store = configureStore({
   reducer: {
      theme: themeSlice.reducer,
      activePage: pageReducer,
      auth: authCheck.reducer,
      itemSelected: itemSelectedReducer,
      data: dataSlice.reducer,
      dataHandle: datleHandleSlice.reducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
