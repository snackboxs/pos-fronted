import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface MenuData {
   menuId: string;
   menuName: string;
   price: number;
   category: string;
   inventory: number;
}

interface MenuState {
   menuList: MenuData[];
   status: "idle" | "loading" | "success" | "error";
   error?: string | null;
}

const initialState: MenuState = {
   menuList: [],
   status: "idle",
   error: null,
};

// fetch menus
export const fetchMenus = createAsyncThunk<
   MenuData[],
   void,
   { rejectValue: string }
>("menu/fetchMenus", async (_, thunkAPI) => {
   try {
      const res = await fetch("/api/admin/menus");
      if (!res.ok) {
         const errorData = await res.json();
         return thunkAPI.rejectWithValue(errorData.message || "Fetch failed");
      }
      return await res.json();
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
   }
});

// update menu
export const updateMenu = createAsyncThunk<
   MenuData,
   Partial<MenuData> & { menuId: string },
   { rejectValue: string }
>("menu/updateMenu", async (params, thunkAPI) => {
   try {
      const res = await fetch(`/api/admin/menu/${params.menuId}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(params),
      });
      if (!res.ok) {
         const errorData = await res.json();
         return thunkAPI.rejectWithValue(errorData.message || "Update failed");
      }
      return await res.json();
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
   }
});

// delete menu
export const deleteMenu = createAsyncThunk<
   { menuId: string },
   string,
   { rejectValue: string }
>("menu/deleteMenu", async (menuId, thunkAPI) => {
   try {
      const res = await fetch(`/api/admin/menu/${menuId}`, {
         method: "DELETE",
      });
      if (!res.ok) {
         const errorData = await res.json();
         return thunkAPI.rejectWithValue(errorData.message || "Delete failed");
      }
      return { menuId };
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
   }
});

export const menuSlice = createSlice({
   name: "menu",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      // fetch
      builder
         .addCase(fetchMenus.pending, (state) => {
            state.status = "loading";
            state.error = null;
         })
         .addCase(fetchMenus.fulfilled, (state, action) => {
            state.status = "success";
            state.menuList = action.payload;
         })
         .addCase(fetchMenus.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload ?? "Unknown error";
         });

      // update
      builder
         .addCase(updateMenu.pending, (state) => {
            state.status = "loading";
            state.error = null;
         })
         .addCase(updateMenu.fulfilled, (state, action) => {
            state.status = "success";
            const index = state.menuList.findIndex(
               (m) => m.menuId === action.payload.menuId
            );
            if (index !== -1) state.menuList[index] = action.payload;
         })
         .addCase(updateMenu.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload ?? "Unknown error";
         });

      // delete
      builder
         .addCase(deleteMenu.pending, (state) => {
            state.status = "loading";
            state.error = null;
         })
         .addCase(deleteMenu.fulfilled, (state, action) => {
            state.status = "success";
            state.menuList = state.menuList.filter(
               (m) => m.menuId !== action.payload.menuId
            );
         })
         .addCase(deleteMenu.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload ?? "Unknown error";
         });
   },
});

export default menuSlice.reducer;
