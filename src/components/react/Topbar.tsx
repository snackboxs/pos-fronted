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
      <div className="sticky top-1 flex gap-2 items-center z-10">
         <SidebarTrigger className="bg-white active:bg-green-500 cursor-pointer" />
         <div className="flex-1 relative">
            <Search className="size-5 absolute top-1/2 -translate-y-1/2 left-3" />
            <Input
               type="text"
               className="rounded-full bg-white h-10 pl-10 focus-visible:border-green-500 focus-visible:ring-green-300/50"
            />
         </div>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button className="mx-2 bg-white hover:bg-secondary active:bg-green-300">
                  <SlidersHorizontal className="text-black size-5" />
               </Button>
            </DropdownMenuTrigger>
            <ItemSelectionPageDropDown />
         </DropdownMenu>
      </div>
   );
}
