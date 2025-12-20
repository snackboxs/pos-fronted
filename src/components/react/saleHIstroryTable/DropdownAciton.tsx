import {
   DropdownMenu, DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { SaleData } from "@/types/salehistory.types";

interface TableActionProps {
   sale: SaleData;
   onViewDetails: (sale: SaleData) => void;
}
export default function DropdownAction({
   sale,
   onViewDetails,
}: TableActionProps) {
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
               onClick={() => navigator.clipboard.writeText(sale.salesId)}
            >
               Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewDetails(sale)}>
               View details
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
