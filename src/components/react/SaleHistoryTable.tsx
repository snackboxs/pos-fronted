"use client";

import * as React from "react";
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
   type ColumnFiltersState,
   type SortingState,
   type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { fetchMenuById } from "@/features/data/fetchMenuByIdThunks";
import type { SaleData } from "@/types/salehistory.types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
   fetchMenuByIdData,
   clearMenuDetail,
} from "@/features/data/fetchMenuByIdSlice";
import { getColumns } from "./saleHIstroryTable/columns";
import DetailDialogBox from "./saleHIstroryTable/DetailDialogBox";
import { exportSalesToExcelAsync } from "./saleHIstroryTable/excel";
import type { MenuData } from "@/types/backendData.types";
import { Spinner } from "../ui/spinner";

interface SaleHistoryTableProps {
   data: SaleData[];
}

export function SaleHistoryTable({ data }: SaleHistoryTableProps) {
   const dispatch = useAppDispatch();
   const menuDetail = useAppSelector(fetchMenuByIdData);
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [showDetailBox, setShowDetailBox] = React.useState(false);
   const [isDetailLoading, setIsDetailLoading] = React.useState(false);
   const [detailError, setDetailError] = React.useState<string | null>(null);
   const [isExporting, setIsExporting] = React.useState(false);
   const [selectedSale, setSelectedSale] = React.useState<SaleData | null>(
      null
   );
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );

   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});

   const handleViewDetails = async (params: SaleData) => {
      try {
         setSelectedSale(params);
         setShowDetailBox(true); // Dialog ကို အရင်ဖွင့်
         setIsDetailLoading(true);
         setDetailError(null);
         dispatch(clearMenuDetail());
         await Promise.all(
            params.items.map((item) =>
               dispatch(fetchMenuById(item.menuId)).unwrap()
            )
         );
      } catch (err: any) {
         console.error("Failed to fetch menus", err);
         setDetailError(err?.message || "Failed to load sale details");
      } finally {
         setIsDetailLoading(false);
      }
   };

   const menuDetailsMap: Record<string, MenuData[]> = {};
   data.forEach((sale) => {
      // Sale items နဲ့ match ဖြစ်တဲ့ menuDetail ကို pick
      const menusForSale = sale.items
         .map((item) => menuDetail.find((menu) => menu.menuId === item.menuId))
         .filter((m): m is MenuData => !!m); // null/undefined ဖယ်

      menuDetailsMap[sale.salesId] = menusForSale;
   });

   const columns = React.useMemo(
      () => getColumns(handleViewDetails),
      [handleViewDetails]
   );

   const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
      meta: {
         openDetail: () => setShowDetailBox(true),
      },
   });

   const handleExportToExcel = async () => {
      try {
         setIsExporting(true); // start spinner
         await exportSalesToExcelAsync(data, dispatch);
      } catch (err) {
         console.error("Export failed", err);
      } finally {
         setIsExporting(false); // stop spinner
      }
   };
   return (
      <div className="w-full">
         <div className="flex items-center py-4">
            <Input
               placeholder="Search Sale ID...."
               value={
                  (table.getColumn("salesId")?.getFilterValue() as string) ?? ""
               }
               onChange={(event) =>
                  table.getColumn("salesId")?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                     Columns <ChevronDown />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        );
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="overflow-hidden rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex items-center space-x-2 mr-auto">
               <p className="text-sm font-medium">Rows per page</p>
               <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                     table.setPageSize(Number(value));
                  }}
               >
                  <SelectTrigger className="h-8 w-[70px]">
                     <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                     />
                  </SelectTrigger>
                  <SelectContent side="top">
                     {[1, 2, 3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                           {pageSize}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            <div className="text-muted-foreground text-sm">
               {table.getState().pagination.pageIndex + 1} of{" "}
               {table.getPageCount()}
            </div>

            <div className="space-x-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  Previous
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  Next
               </Button>
            </div>
         </div>
         <Button
            onClick={handleExportToExcel}
             disabled={isExporting}
            className="ml-2 bg-blue-600 text-white hover:bg-blue-700 mt-4"
         >
            {isExporting ? <Spinner /> : "Export to Excel"}
         </Button>
         <DetailDialogBox
            open={showDetailBox}
            setOpen={setShowDetailBox}
            menuDetail={menuDetail}
            loading={isDetailLoading}
            error={detailError}
            sale={selectedSale}
         />
      </div>
   );
}
