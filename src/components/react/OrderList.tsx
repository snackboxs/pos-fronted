import { Button } from "../ui/button";
import {
   Item,
   ItemContent,
   ItemDescription,
   ItemGroup,
   ItemMedia,
   ItemTitle,
} from "../ui/item";

import Payment from "./Payment";
import { itemSelected } from "../../features/itemSelected/itemSelectedSlice";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hooks";

function ItemImage() {
   const selectedData = useSelector(itemSelected);
   console.log(selectedData);
   
   return (
      <div className="flex w-full max-w-md flex-col gap-6">
         <ItemGroup className="gap-2">
            {selectedData.map((data) => (
               <Item
                  key={data.menuId}
                  variant="outline"
                  asChild
                  role="listitem"
                  className="bg-gray-500/10 shadow-sm border-none"
               >
                  <a href="#">
                     <ItemMedia variant="default">
                        <img
                           src={data.imageUrl}
                           width={32}
                           height={32}
                           className="object-cover grayscale"
                        />
                     </ItemMedia>
                     <ItemContent>
                        <ItemTitle className="line-clamp-1">
                           {data.menuName} -{" "}
                        </ItemTitle>
                        <div className="flex flex-row justify-between">
                           <ItemDescription>
                              {data.price * data.selectedQuantity}$
                           </ItemDescription>
                           <ItemDescription>
                              {data.selectedQuantity}
                           </ItemDescription>
                        </div>
                     </ItemContent>
                  </a>
               </Item>
            ))}
         </ItemGroup>
      </div>
   );
}

export default function OrderList() {
   const selectedData = useAppSelector(itemSelected);
   const subTotal = selectedData.reduce(
      (total, data) => total + data.price * data.selectedQuantity,
      0
   );
   const taxRate = 0.05; // 5%
   const tax = subTotal * taxRate;
   const totalAmount = subTotal + tax;
   return (
      <>
         <h2 className="text-xl font-semibold mb-4 p-2 mt-2">Table</h2>
         <div className=" w-full p-2 flex-1 overflow-y-auto thin-scrollbar">
            <ItemImage />
         </div>
         <div className=" w-full bg-transparent p-4">
            {/* style={{ height: 200 }} */}
            <ItemGroup className="bg-secondary rounded-xl">
               <Item>
                  <ItemContent>
                     <div className="flex justify-between">
                        <ItemDescription>Sub Total</ItemDescription>
                        <ItemDescription>{subTotal}$</ItemDescription>
                     </div>
                     <div className="flex justify-between">
                        <ItemDescription>Tax</ItemDescription>
                        <ItemDescription>{tax}$</ItemDescription>
                     </div>
                     <div className="dot-divider"></div>
                     <div className="flex justify-between">
                        <ItemTitle>Tootal Amount</ItemTitle>
                        <ItemTitle>{totalAmount}$</ItemTitle>
                     </div>
                  </ItemContent>
               </Item>
            </ItemGroup>
            <div className="grid grid-cols-3 gap-3 mt-3">
               <Payment />
            </div>
            <Button className="w-full mt-5 text-white bg-green-600 hover:bg-green-700 active:bg-green-600">
               Place Order
            </Button>
         </div>
      </>
   );
}
