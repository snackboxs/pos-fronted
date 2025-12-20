import type { ColumnDef } from "@tanstack/react-table";
import type { SaleData } from "@/types/salehistory.types";
import { Checkbox } from "@/components/ui/checkbox";
import DropdownAction from "./DropdownAciton";

export const getColumns = (
   handleViewDetails: (sale: SaleData) => void
): ColumnDef<SaleData>[] => [
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
         const totalTax = taxes.reduce((acc, curr) => acc + curr.taxAmount, 0);
         return <div>${totalTax.toFixed(3)}</div>;
      },
   },
   {
      accessorKey: "totalAmount",
      header: () => <div>Total Amount</div>,
      cell: ({ row }) => {
         const amount = parseFloat(row.getValue("totalAmount"));
         return (
            <div className="font-bold text-green-600">${amount.toFixed(3)}</div>
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
      // enableHiding: false,
      header: "Action",
      cell: ({ row }) => (
         <DropdownAction
            sale={row.original}
            onViewDetails={handleViewDetails}
         />
      ),
   },
];
