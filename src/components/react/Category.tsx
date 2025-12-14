import { LayoutGrid, Apple, Coffee } from "lucide-react";
import { useState } from "react";

interface BoxProps {
   children: React.ReactNode;
   className?: string;
   isActive: boolean;
   onClick: () => void;
}

function Box({ className, children, isActive, onClick }: BoxProps) {
   const baseClasses = "cursor-pointer min-w-25 h-30 rounded-xl p-3 shadow-md";
   const activeClasses = "bg-green-200 shadow-lg hover:bg-green-300"; // active ဖြစ်ရင် ပေးမယ့် style
   const inactiveClasses =
      "bg-white text-gray-800 hover:bg-gray-200 active:bg-gray-100"; // inactive ဖြစ်ရင် ပေးမယ့် style

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

const categories = [
   { id: 1, name: "All", count: 26, icon: LayoutGrid },
   { id: 2, name: "Foods", count: 12, icon: Apple },
   { id: 3, name: "Drinks", count: 8, icon: Coffee },
   { id: 4, name: "All", count: 26, icon: LayoutGrid },
   { id: 5, name: "Foods", count: 12, icon: Apple },
   { id: 6, name: "Drinks", count: 8, icon: Coffee },
   { id: 7, name: "All", count: 26, icon: LayoutGrid },
   { id: 8, name: "Foods", count: 12, icon: Apple },
   { id: 9, name: "Drinks", count: 8, icon: Coffee },
   { id: 10, name: "All", count: 26, icon: LayoutGrid },
   { id: 11, name: "Foods", count: 12, icon: Apple },
   { id: 12, name: "Drinks", count: 8, icon: Coffee },
   
];

export default function Category() {
   const [activeIndex, setActiveIndex] = useState(0);

   return (
      <div className="mt-18 absolute right-0 left-0 flex gap-5 overflow-x-scroll p-3 thin-scrollbar">
         {categories.map((category, index) => (
            <Box
               key={category.id}
               isActive={index === activeIndex}
               onClick={() => setActiveIndex(index)}
            >
               <category.icon />
               <h1 className="mt-5">{category.name}</h1>
               <small>{category.count} items</small>
            </Box>
         ))}
      </div>
   );
}
