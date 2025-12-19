"use client";

import * as React from "react";
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
   type ColumnDef,
   type ColumnFiltersState,
   type SortingState,
   type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
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

interface SaleHistoryTableProps {
   data: SaleData[];
}

export function SaleHistoryTable({ data }: SaleHistoryTableProps) {
   const dispatch = useAppDispatch();
   const menuDetail = useAppSelector(fetchMenuByIdData);
   const [sorting, setSorting] = React.useState<SortingState>([]);
   const [showDetailBox, setShowDetailBox] = React.useState(false);
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   );
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = React.useState({});

   // console.log(menuDetail);
   // console.log("menuDetail");

   //   console.log("sale data", data );
   // console.log(data);

   const columns: ColumnDef<SaleData>[] = [
      {
         id: "select",
         header: ({ table }) => (
            <Checkbox
               checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
               }
               onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
               }
               aria-label="Select all"
            />
         ),
         cell: ({ row }) => (
            <Checkbox
               checked={row.getIsSelected()}
               onCheckedChange={(value) => row.toggleSelected(!!value)}
               aria-label="Select row"
            />
         ),
         enableSorting: false,
         enableHiding: false,
      },
      {
         accessorKey: "salesId", // 'invoiceNo' အစား 'salesId' လို့ ပြောင်းပါ
         header: "Sale ID",
         cell: ({ row }) => <div>{row.getValue("salesId")}</div>,
      },
      {
         accessorKey: "saleDate",
         header: "Date",
         cell: ({ row }) => <div>{row.getValue("saleDate")}</div>,
      },
      {
         accessorKey: "subTotal",
         header: "Sub Total",
         cell: ({ row }) => (
            <div className="font-medium">${row.getValue("subTotal")}</div>
         ),
      },
      {
         accessorKey: "taxs",
         header: "Total Tax",
         cell: ({ row }) => {
            const taxes = row.original.taxs || [];
            // Tax array ထဲက taxAmount အားလုံးကို ပေါင်းလိုက်တာပါ
            const totalTax = taxes.reduce(
               (acc, curr) => acc + curr.taxAmount,
               0
            );
            return <div>${totalTax.toFixed(3)}</div>;
         },
      },
      {
         accessorKey: "totalAmount",
         header: () => <div>Total Amount</div>,
         cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalAmount"));
            return (
               <div className="font-bold text-green-600">
                  ${amount.toFixed(3)}
               </div>
            );
         },
      },
      {
         accessorKey: "createdBy",
         header: "Cashier",
         cell: ({ row }) => <div>{row.original.createdBy.userName}</div>,
      },
      {
         id: "actions",
         enableHiding: false,
         cell: ({ row, table }) => {
            const payment = row.original;

            return (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuItem
                        onClick={() =>
                           navigator.clipboard.writeText(payment.salesId)
                        }
                     >
                        Copy payment ID
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>View customer</DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={async () => {
                           try {
                              dispatch(clearMenuDetail()); // clear old data
                              // console.log(Promise);

                              // fetch all menus
                              await Promise.all(
                                 payment.items.map((item) => {
                                    // console.log(item);

                                    dispatch(
                                       fetchMenuById(item.menuId)
                                    ).unwrap();
                                 })
                              );

                              // dialog open
                              setShowDetailBox(true);
                           } catch (err) {
                              console.error("Failed to fetch menus", err);
                           }
                        }}
                     >
                        View details
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            );
         },
      },
   ];

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
         <Dialog open={showDetailBox} onOpenChange={setShowDetailBox}>
            <DialogContent className="w-[500px]">
               <DialogTitle>Sale Details</DialogTitle>
               <DialogDescription>
                  Here are the details of the sale items.
               </DialogDescription>

               <div className="space-y-2 mt-4">
                  {menuDetail.length > 0 ? (
                     menuDetail.map((item, index) => {
                        // If the slice stores the whole response, access menu.data
                        const menu = item;
                        // console.log(menu.data);
                        
                        return (
                           <div key={index} className="mb-4">
                              <p className="font-medium">
                                 Name: {menu.menuName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 Price: {menu.price}
                              </p>
                           </div>
                        );
                     })
                  ) : (
                     <p>No items found.</p>
                  )}
               </div>

               <DialogFooter className="mt-4">
                  <DialogClose asChild>
                     <Button variant="outline">Close</Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
}
