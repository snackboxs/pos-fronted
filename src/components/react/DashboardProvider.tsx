import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { MenuData } from "@/types/backendData.types";

interface DashboardContextType {
   showDataLimit: number;
   setShowDataLimit: Dispatch<SetStateAction<number>>;
   homePage: number;
   setHomePage: Dispatch<SetStateAction<number>>;
   homeSize: number;
   setHomeSize: Dispatch<SetStateAction<number>>;
   stockDataArr: MenuData[];
   setStockDataArr: Dispatch<SetStateAction<MenuData[]>>;
}

const DashboardContext = createContext<DashboardContextType>({
   showDataLimit: 5,
   setShowDataLimit: () => {},
   homePage: 0,
   setHomePage: () => {},
   homeSize: 1,
   setHomeSize: () => {},
   stockDataArr: [],
   setStockDataArr: () => {},

});

export function useDashboardContext() {
   return useContext(DashboardContext);
}

export default function DashboardProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [showDataLimit, setShowDataLimit] = useState(5);
   const [homePage, setHomePage] = useState(0);
   const [homeSize, setHomeSize] = useState(10);
   const [stockDataArr, setStockDataArr] = useState<MenuData[]>([]);
 
   return (
      <DashboardContext.Provider
         value={{
            showDataLimit,
            setShowDataLimit,
            homePage,
            setHomePage,
            homeSize,
            setHomeSize,
            stockDataArr,
            setStockDataArr
         }}
      >
         {children}
      </DashboardContext.Provider>
   );
}
