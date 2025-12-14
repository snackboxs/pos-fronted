import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";
import type { MenuData } from "../../types/backendData.types.ts";

interface InitalData {
   selectedData: (MenuData & { selectedQuantity: number })[];
}
const initialState: InitalData = {
   selectedData: [],
};

export const itemSelectedSlice = createSlice({
   name: "itemSelected",
   initialState,
   reducers: {
      addProduct: (
         state,
         action: PayloadAction<MenuData & { selectedQuantity: number }>
      ) => {
         const index = state.selectedData.findIndex(
            (item) => item.menuId === action.payload.menuId
         );
         console.log(action.payload.selectedQuantity);

         if (index >= 0) {
            // Update existing
            state.selectedData[index].selectedQuantity =
               action.payload.selectedQuantity;
         } else {
            // Add new
            state.selectedData.push(action.payload);
         }
      },
      cancleProduct: (
         state,
         action: PayloadAction<MenuData & { selectedQuantity: number }>
      ) => {
         const index = state.selectedData.findIndex(
            (item) => item.menuId === action.payload.menuId
         );
         if (index >= 0) {
            // Update quantity to new value (could be 0)
            state.selectedData[index].selectedQuantity =
               action.payload.selectedQuantity;

            // Optional: quantity 0 ဆိုရင် remove
            if (state.selectedData[index].selectedQuantity <= 0) {
               state.selectedData.splice(index, 1); // remove from array
            }
         }
      },
   },
});

export const { addProduct, cancleProduct } = itemSelectedSlice.actions;
export const itemSelected = (state: RootState) =>
   state.itemSelected.selectedData;
export default itemSelectedSlice.reducer;
