import {
   LayoutGrid,
   Apple,
   Coffee,
   Utensils,
   IceCream,
   GlassWater,
   type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useCategory } from "@/hooks/useCategory";
import { Spinner } from "../ui/spinner";

interface BoxProps {
   children: React.ReactNode;
   className?: string;
   isActive: boolean;
   onClick: () => void;
}

function Box({ className, children, isActive, onClick }: BoxProps) {
   const baseClasses = "cursor-pointer min-w-25 h-30 rounded-xl p-3 shadow-md";
   const activeClasses = "bg-green-700 shadow-lg hover:bg-green-800 text-white"; // active ဖြစ်ရင် ပေးမယ့် style
   const inactiveClasses = "hover:bg-sidebar-accent bg-gray-200/10"; // inactive ဖြစ်ရင် ပေးမယ့် style
   return (
      <div
         className={`${baseClasses} ${
            isActive ? activeClasses : inactiveClasses
         } ${className}`}
         onClick={onClick}
      >
         {children}
      </div>
   );
}

const iconMap: Record<string, LucideIcon> = {
   Drink: Coffee,
   Snack: Utensils,
   Desserts: IceCream,
   Beverages: GlassWater,
   All: LayoutGrid,
};
export default function Category() {
   const [activeIndex, setActiveIndex] = useState(0);
   const { data, isLoading, isError } = useCategory();
   
   if (isLoading) return <Spinner />;
   if (isError) return <p>Error...</p>;

   const categories = data || [];
   // console.log( categories + "categories");

   return (
      <div className="mt-18 absolute right-0 left-0 flex gap-5 overflow-x-scroll p-3 thin-scrollbar">
         {categories.map((category, index) => {
            const IconComponent = iconMap[category.categoryName] || LayoutGrid;
            return (
               <Box
                  key={category.categoryId}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
               >
                  <IconComponent />
                  <h1 className="mt-5">{category.categoryName}</h1>
                  <small>
                     {/* {category.count} */}
                     items
                  </small>
               </Box>
            );
         })}
      </div>
   );
}
