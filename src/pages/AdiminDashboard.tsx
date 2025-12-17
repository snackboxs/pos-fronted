import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
// import { productData } from "@/features/data/dataSlice";
import { useSelector } from "react-redux";
import style from "../css/AdminDashboard.module.css";
import { useSaleHistory } from "@/hooks/useSaleHistory";
import { SaleHistoryTable } from "@/components/react/SaleHistoryTable";

export default function AdminDashboard() {
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [page, setPage] = useState(1);
   const total = 50;
   const from = (page - 1) * rowsPerPage + 1;
   const to = Math.min(page * rowsPerPage, total);
   // const data = useSelector(productData);
   const { data, isLoading, isError } = useSaleHistory();
   console.log(data);

   if (isLoading) return <p>Loading...</p>;
   if (isError) return <p>Error...</p>;
   
   const saleData = data?.content || [];

   return (
      <div className="flex flex-col relative h-full">
         <div className="mt-5 flex-1 overflow-hidden">
            <SaleHistoryTable data={saleData}/>
         </div>
      </div>
   );
}
