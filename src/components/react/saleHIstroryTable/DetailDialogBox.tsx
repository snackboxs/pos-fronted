import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogTitle,
} from "@/components/ui/dialog";
import {
   Item,
   ItemContent,
   ItemDescription,
   ItemGroup,
   ItemMedia,
   ItemTitle,
} from "@/components/ui/item";

import { Button } from "@/components/ui/button";
import type { MenuData } from "@/types/backendData.types";
import { Spinner } from "@/components/ui/spinner";
import { AlertTriangle } from "lucide-react";
import type { SaleData } from "@/types/salehistory.types";

interface DetailDialogsInputData {
   open: boolean;
   setOpen: (open: boolean) => void;
   menuDetail: MenuData[];
   loading: boolean;
   error: string | null;
   sale: SaleData | null;
}

export default function DetailDialogBox({
   open,
   setOpen,
   menuDetail,
   loading,
   error,
   sale,
}: DetailDialogsInputData) {
   console.log("sale");

   console.log(sale);
   console.log("menuDetail");
   console.log(menuDetail);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="w-[500px]">
            <DialogTitle>Sale Details</DialogTitle>
            <DialogDescription>
               Here are the details of the sale items.
            </DialogDescription>

            <div className="mt-4 min-h-[140px] flex items-center justify-center">
               {loading ? (
                  <Spinner />
               ) : error ? (
                  <div className="flex flex-col items-center gap-2 text-red-600">
                     <AlertTriangle />
                     <p className="text-sm text-center">{error}</p>
                  </div>
               ) : menuDetail.length > 0 ? (
                  <div className="w-full space-y-2">
                     <ItemGroup className="gap-1">
                        {menuDetail.map((menu, index) => {
                           const saleItem = sale?.items.find(
                              (item) => item.menuId === menu.menuId
                           );

                           return (
                              <Item
                                 key={menu.menuId}
                                 variant="outline"
                                 asChild
                                 role="listitem"
                                 className="bg-gray-500/10 shadow-sm border-none p-2"
                              >
                                 <a href="#">
                                    <ItemMedia>
                                       <img
                                          src={menu.imageUrl}
                                          className="object-cover w-[80px] aspect-square"
                                       />
                                    </ItemMedia>
                                    <ItemContent>
                                       <div className="flex flex-row justify-between">
                                          <ItemTitle className="line-clamp-1">
                                             {menu.menuName} -{" "}
                                          </ItemTitle>
                                           <ItemDescription>
                                            <small>total - </small> {saleItem?.total}$
                                          </ItemDescription>
                                       </div>
                                       <div className="flex flex-row justify-between">
                                          <ItemDescription>
                                             {menu.price}$/<small>oneitem</small>
                                          </ItemDescription>
                                          <ItemDescription>
                                             <small>sould out - </small>
                                             {saleItem?.quantity}
                                          </ItemDescription>
                                       </div>
                                    </ItemContent>
                                 </a>
                              </Item>
                           );
                        })}
                     </ItemGroup>
                  </div>
               ) : (
                  <p>No items found.</p>
               )}
            </div>

            <DialogFooter className="mt-4">
               <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
