// import type { MenuData } from "@/types/backendData.types";
// import type { AppDispatch } from "@/store";
// import { fetchMenuById } from "@/features/data/fetchMenuByIdThunks";
// import type { SaleData } from "@/types/salehistory.types";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// export const exportSalesToExcelAsync = async (
//    data: SaleData[],
//    dispatch: AppDispatch
// ) => {
//    const menuDetailsMap: Record<string, MenuData[]> = {};

//    for (const sale of data) {
//       const menus: MenuData[] = [];
//       for (const item of sale.items) {
//          try {
//             const response = await dispatch(
//                fetchMenuById(item.menuId)
//             ).unwrap();
//             const menu: MenuData = response.data; // <-- ဒီနေရာမှာ unwrap result ရဲ့ data ကိုသုံး
//             menus.push(menu);
//          } catch (err) {
//             console.error("Failed to fetch menu for Excel", err);
//          }
//       }
//       menuDetailsMap[sale.salesId] = menus;
//    }

//    const saleSheet = data.map((sale) => {
//       const items = menuDetailsMap[sale.salesId]
//          ?.map((menu) => {
//             const saleItem = sale.items.find((i) => i.menuId === menu.menuId);
//             return `${menu.menuName} x${saleItem?.quantity} ($${saleItem?.total})`;
//          })
//          .join(", ");

//       console.log(items);

//       return {
//          SaleID: sale.salesId,
//          Customer: sale.createdBy.userName || "",
//          Date: sale.saleDate,
//          TotalAmount: sale.totalAmount,
//          Items: items || "",
//       };
//    });

//    const worksheet = XLSX.utils.json_to_sheet(saleSheet);
//    const workbook = XLSX.utils.book_new();
//    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesHistory");

//    const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//    });
//    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//    saveAs(blob, "SalesHistory.xlsx");
// };

import type { MenuData } from "@/types/backendData.types";
import type { AppDispatch } from "@/store";
import { fetchMenuById } from "@/features/data/fetchMenuByIdThunks";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { SaleData } from "@/types/salehistory.types";

export const exportSalesToExcelAsync = async (
   data: SaleData[],
   dispatch: AppDispatch
) => {
   const saleSheet: any[] = [];

   for (const sale of data) {
      for (const item of sale.items) {
         try {
            const response = await dispatch(
               fetchMenuById(item.menuId)
            ).unwrap();
            const menu: MenuData = response.data;

            saleSheet.push({
               SaleID: sale.salesId,
               Customer: sale.createdBy.userName || "",
               Date: sale.saleDate,
               TotalAmount: sale.totalAmount,
               ItemName: menu.menuName,
               Quantity: item.quantity,
               Price: menu.price,
               ItemTotal: item.total,
            });
         } catch (err) {
            console.error("Failed to fetch menu for Excel", err);
         }
      }
   }

   const worksheet = XLSX.utils.json_to_sheet(saleSheet);
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, "SalesHistory");

   const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
   });
   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
   saveAs(blob, "SalesHistory.xlsx");
};
