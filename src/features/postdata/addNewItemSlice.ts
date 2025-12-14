import {
   createSlice,
   createAsyncThunk,
   type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface Menu {
   menuName: string;
   price: number;
   categoryId: string;
   description: string;
   quantity: number;
   uom: string;
}

const addNewItemSlice = createSlice({
   name: "addNewItemSlice",
   initialState: 0,
   reducers: {},
});


