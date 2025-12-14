import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   ChevronRight, ChevronLeft
} from "lucide-react";
import { useState } from "react";
// import { productData } from "@/features/data/dataSlice";
import { useSelector } from "react-redux";
import style from "../css/AdminDashboard.module.css";

export default function AdminDashboard() {
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [page, setPage] = useState(1);
   const total = 50;
   const from = (page - 1) * rowsPerPage + 1;
   const to = Math.min(page * rowsPerPage, total);
   // const data = useSelector(productData);

   return (
      <div className="flex flex-col relative h-full">
         <div className="flex gap-5 mt-5">
            <div className="flex-1 h-20 bg-white rounded-xl">
               <h2 className="text-center font-bold p-5">Total Sale</h2>
            </div>
            <div className="flex-1 h-20 bg-white rounded-xl">
               <h2 className="text-center font-bold p-5">Total Revenue</h2>
            </div>
            <div className="flex-1 h20 bg-white rounded-xl">
               <h2 className="text-center font-bold p-5">Total Items Sold</h2>
            </div>
         </div>
         <div className="mt-5 flex-1 overflow-hidden">
            {/* <table className="table-auto border border-gray-200">
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Quantity</th>
                     <th className="text-right">Amount</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((item) => (
                     <tr key={item.id}>
                        <td className="font-medium">{item.description}</td>
                        <td>{item.price * item.quantity}$</td>
                        <td>{item.quantity}</td>
                     </tr>
                  ))}
                  {data.map((item) => (
                     <tr key={item.id}>
                        <td className="font-medium">{item.description}</td>
                        <td>{item.price * item.quantity}$</td>
                        <td className="text-right">{item.quantity}</td>
                     </tr>
                  ))}
               </tbody>
               <tfoot>
                  <tr>
                     <td colSpan={2}>Total</td>
                     <td className="text-right">$2,500.00</td>
                  </tr>
               </tfoot>
            </table> */}
         </div>
         <div className="absolute bottom-0 bg-white flex w-full items-center px-2 py-3">
            <div className="flex-1"></div>
            <div>Rows per page: </div>
            <div className="mx-3">
               <Select
                  onValueChange={(val) => {
                     setRowsPerPage(Number(val));
                     setPage(1);
                  }}
               >
                  <SelectTrigger className="w-fit border-none">
                     <SelectValue placeholder="5" />
                  </SelectTrigger>
                  <SelectContent className="min-w-fit">
                     <SelectItem value="5">5</SelectItem>
                     <SelectItem value="10">10</SelectItem>
                     <SelectItem value="20">20</SelectItem>
                     <SelectItem value="30">30</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <span>
               {from}-{to} of {total}
            </span>

            <ChevronLeft onClick={() => setPage((p) => Math.max(p - 1, 1))} />
            <ChevronRight
               onClick={() => setPage((p) => (to < total ? p + 1 : p))}
            />
         </div>
      </div>
   );
}
