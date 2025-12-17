import { SidebarTrigger } from "../ui/sidebar";
import { SlidersHorizontal, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
   DropdownMenu,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ItemSelectionPageDropDown } from "./sort/ItemSelectionPageDropDown";

export default function Topbar() {
   return (
      <div className="sticky top-0 py-1 flex gap-2 items-center z-10 backdrop-blur-2xl">
         <SidebarTrigger className="cursor-pointer" />
         <div className="flex-1 relative">
            <Search className="size-5 absolute top-1/2 -translate-y-1/2 left-3" />
            <Input
               type="text"
               className="rounded-full"
            />
         </div>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button className="cursor-pointer mx-2 bg-transparent" variant={"outline"}>
                  <SlidersHorizontal className="size-5" />
               </Button>
            </DropdownMenuTrigger>
            <ItemSelectionPageDropDown />
         </DropdownMenu>
      </div>
   );
}
