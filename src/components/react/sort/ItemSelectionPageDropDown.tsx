import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuCheckboxItem,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoveDown, MoveUp } from "lucide-react";
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function ItemSelectionPageDropDown() {
   const [showPanel, setShowPanel] = useState<Checked>(false);
   const [aToZOrder, setAToZOrder] = useState<Checked>(false);
   const [oldestDateFirst, setOldestDateFirst] = useState<Checked>(false);

   return (
      <DropdownMenuContent className="w-56" align="start">
         <DropdownMenuLabel>Sort By</DropdownMenuLabel>
         <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
               checked={showPanel}
               onCheckedChange={setShowPanel}
            >
               Category
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>Name</DropdownMenuSubTrigger>
               <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                     <DropdownMenuCheckboxItem
                        checked={aToZOrder}
                        onCheckedChange={() => setAToZOrder(true)}
                     >
                        A to Z
                        <DropdownMenuShortcut>
                           <MoveDown />
                        </DropdownMenuShortcut>
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                        checked={aToZOrder ? false : true}
                        onCheckedChange={() => setAToZOrder(false)}
                     >
                        Z to A
                        <DropdownMenuShortcut>
                           <MoveUp />
                        </DropdownMenuShortcut>
                     </DropdownMenuCheckboxItem>
                  </DropdownMenuSubContent>
               </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>Date</DropdownMenuSubTrigger>
               <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                     <DropdownMenuCheckboxItem
                        checked={oldestDateFirst}
                        onCheckedChange={() => setOldestDateFirst(true)}
                     >
                        Old
                     </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem
                        checked={oldestDateFirst ? false : true}
                        onCheckedChange={() => setOldestDateFirst(false)}
                     >
                        New
                     </DropdownMenuCheckboxItem>
                  </DropdownMenuSubContent>
               </DropdownMenuPortal>
            </DropdownMenuSub>
         </DropdownMenuGroup>
         <DropdownMenuSeparator />
      </DropdownMenuContent>
   );
}
