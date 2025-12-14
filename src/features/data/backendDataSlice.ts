import {
   createSlice,
   createAsyncThunk,
   type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { auth } from "../auth/authCheck";
import { logoutUser } from "../auth/authCheck";
import type {
   MenuState,
   MenuPagination,
   FetchMenusParams,
   MenuApiResponse,
   PaginationState,
} from "../../types/backendData.types";

const createPaginationState = (size: number): PaginationState => ({
   menuList: [],
   status: "idle",
   error: null,
   page: 0,
   size,
   totalElements: 0,
   totalPages: 0,
});

const initialState: MenuState = {
   card: createPaginationState(10), // user side
   stock: createPaginationState(5), // admin side (load more)
};

export const fetchMenus = createAsyncThunk<
   { scope: "card" | "stock"; data: MenuPagination },
   FetchMenusParams,
   { rejectValue: string; state: RootState }
>(
   "productData/fetchMenus",
   async (params, { rejectWithValue, getState, dispatch }) => {
      try {
         const { scope, page, size } = params;
         const token = auth(getState()).token;

         if (!token) {
            return rejectWithValue("Authorization token not found.");
         }

         const response = await fetch(
            `/api/admin/menu?page=${page}&size=${size}`,
            {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         if (!response.ok) {
            const errorData = await response.json();

            if (response.status === 401) {
               dispatch(setStatusIdle());
               dispatch(logoutUser());
            }

            return rejectWithValue(
               errorData.message || "Failed to fetch menu data"
            );
         }

         const result: MenuApiResponse = await response.json();
         console.log("API result:", result);
         return { scope, data: result.data };
      } catch (error: any) {
         return rejectWithValue(
            error.message || "An unknown network error occurred"
         );
      }
   }
);

export const dataSlice = createSlice({
   name: "productData",
   initialState,
   reducers: {
      setPaginationParams: (
         state,
         action: PayloadAction<{
            scope: "card" | "stock";
            page?: number;
            size?: number;
         }>
      ) => {
         const target = state[action.payload.scope];
         // target = state.card.
         // or
         // target = state.stock

         if (action.payload.page !== undefined) {
            target.page = action.payload.page;
         }
         if (action.payload.size !== undefined) {
            target.size = action.payload.size;
         }

         target.status = "idle";
      },
      setStatusIdle: (state) => {
         state.card.status = "idle";
         state.stock.status = "idle";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchMenus.pending, (state, action) => {
            const { scope } = action.meta.arg;
            if (!scope || !state[scope]) return;
            // console.log("fetchMenus dispatch arg:", action.meta.arg);
            state[scope].status = "loading";
            state[scope].error = null;
         })
         .addCase(fetchMenus.fulfilled, (state, action) => {
            const { scope, data } = action.payload;
            if (!scope || !state[scope]) return;
            const target = state[scope];

            target.status = "succeeded";

            if (scope === "stock") {
               const existingIds = new Set(
                  target.menuList.map((item) => item.menuId)
               );
               const newItems = data.content.filter(
                  (item) => !existingIds.has(item.menuId)
               );
               target.menuList.push(...newItems);
            } else {
               target.menuList = data.content;
            }

            target.page = data.page;
            target.size = data.size;
            target.totalElements = data.totalElements;
            target.totalPages = data.totalPages;
         })
         .addCase(fetchMenus.rejected, (state, action) => {
            const { scope } = action.meta.arg;
            const target = state[scope];

            target.status = "failed";
            target.error =
               (action.payload as string) ||
               action.error.message ||
               "Failed to load data";
         });
   },
});

export const { setPaginationParams, setStatusIdle } = dataSlice.actions;

export const selectCardData = (state: RootState) => state.data.card;
export const selectStockData = (state: RootState) => state.data.stock;

export default dataSlice.reducer;
