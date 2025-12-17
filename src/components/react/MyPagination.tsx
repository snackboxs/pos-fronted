import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
   selectCardData,
   setPaginationParams,
   fetchMenus,
} from "@/features/data/backendDataSlice";

export default function MyPagination() {
   const dispatch = useAppDispatch();
   const { page, size, totalPages, totalElements } =
      useAppSelector(selectCardData);

   //  page click handler
   const handlePageChange = (newPage: number) => {
      dispatch(setPaginationParams({scope: "card", page: newPage }));
      dispatch(fetchMenus({scope: "card", page: newPage, size }));
   };

   //  size change handler
   const handleSizeChange = (value: string) => {
      const newSize = parseInt(value);
      dispatch(setPaginationParams({scope: "card", size: newSize, page: 0 }));
      dispatch(fetchMenus({scope: "card", page: 0, size: newSize }));
   };

   // Dynamic page number list
   const pages = Array.from({ length: totalPages }, (_, i) => i);
   
   return (
      <div className="flex sticky bottom-0 bg-gray-200/10 backdrop-blur-3xl shadow-xl w-full items-center justify-between p-4">
         <Pagination>
            <PaginationContent className="rounded-full p-3">
               {/* Previous */}
               <PaginationItem>
                  <PaginationPrevious
                     aria-disabled={page < 1}
                      tabIndex={page < 1 ? -1 : 0}
                     className={
                        page < 1
                           ? "pointer-events-none opacity-50 cursor-not-allowed"
                           : ""
                     }
                     onClick={(e) => {
                        if (page < 1) {
                           e.preventDefault();
                           return;
                        }
                        // real action
                        handlePageChange(page - 1);
                     }}
                  />
               </PaginationItem>

               {/* Page Numbers */}
               {pages.map((num) => (
                  <PaginationItem key={num}>
                     <PaginationLink
                        isActive={page === num}
                        onClick={() => handlePageChange(num)}
                     >
                        {num + 1}
                     </PaginationLink>
                  </PaginationItem>
               ))}

               {/* Next */}
               <PaginationItem>
                  <PaginationNext
                     aria-disabled={page >= totalPages - 1}
                     tabIndex={page >= totalPages - 1 ? -1 : 0}
                     className={
                        page >= totalPages - 1
                           ? "pointer-events-none opacity-50 cursor-not-allowed"
                           : ""
                     }
                     onClick={(e) => {
                        if (page >= totalPages - 1) {
                           e.preventDefault();
                           return;
                        }
                        // real action
                        handlePageChange(page + 1);
                     }}
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>

         {/* Page Size Select */}
         <Select onValueChange={handleSizeChange}>
            <SelectTrigger>
               <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  {[1, 2, 3, 5, 10].map((s) => (
                     <SelectItem key={s} value={s.toString()}>
                        {s}
                     </SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   );
}
