import { useState } from "react";
import { useSaleHistory } from "@/hooks/useSaleHistory";
import { SaleHistoryTable } from "@/components/react/SaleHistoryTable";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MessageSquareX } from "lucide-react";
export default function AdminDashboard() {
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [page, setPage] = useState(1);
   const total = 50;
   const from = (page - 1) * rowsPerPage + 1;
   const to = Math.min(page * rowsPerPage, total);
   const { data, isLoading, isError, error } = useSaleHistory();

   if (isLoading) {
      return (
         <div className="mt-5 flex flex-col items-center gap-4 justify-center">
            <Button variant="outline" disabled size="sm">
               <Spinner />
               Loading...
            </Button>
         </div>
      );
   }
   if (isError) {
      return (
         <div className="mt-5 flex flex-col items-center gap-4 justify-center">
            <Button variant="outline" disabled size="sm">
               <MessageSquareX /> {error?.message || "Something went wrong"}
            </Button>
         </div>
      );
   }

   const saleData = data?.content || [];

   return (
      <div className="flex flex-col relative h-full">
         <div className="mt-5 flex-1 overflow-hidden">
            <SaleHistoryTable data={saleData} />
         </div>
      </div>
   );
}
