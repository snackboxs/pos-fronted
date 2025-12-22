import OrderList from "./OrderList";
import { cn } from "@/lib/utils";

type MenuCardProps = {
   className?: string;
};

export default function MenuCard({ className }: MenuCardProps) {
   return (
      <div
         className={cn(
            "sticky right-0 top-4 flex flex-col bg-gray-300/20 w-[350px] rounded-2xl shadow-lg overflow-hidden",
            className
         )}
         style={{ height: "calc(100vh - 2rem)" }}
      >
         <OrderList />
      </div>
   );
}
