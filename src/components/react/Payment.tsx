import { icons } from "lucide-react";
import { useState } from "react";
import {
   CreditCard,
   Banknote,
   QrCode,
   Quote,
   type LucideIcon,
} from "lucide-react";

interface PaymentProps {
   Icon: React.ElementType; // LucideIcon
   text: string;
}

const payment = [
   {
      icons: Banknote,
      text: "Cash",
   },
   {
      icons: CreditCard,
      text: "Credit Card",
   },
   {
      icons: QrCode,
      text: "QR Code",
   },
];

export default function Payment() {
   const [activePaymentIndex, setActivePaymentIndex] = useState(0);

   const defaultStyle =
      "border rounded-xl py-2 flex flex-col items-center mb-2 hover:bg-gray-200 cursor-pointer active:bg-gray-100";
   const activeStyle = "bg-green-200 hover:bg-green-300";
   const inActiveStyle = "bg-white";

   return (
      <>
         {payment.map((p, index) => {
            return (
               <div key={p.text} className="text-center">
                  <div
                     className={`${defaultStyle} ${
                        index === activePaymentIndex
                           ? activeStyle
                           : inActiveStyle
                     }`}
                     onClick={() => setActivePaymentIndex(index)}
                  >
                     <p.icons />
                  </div>
                  <small>{p.text}</small>
               </div>
            );
         })}
      </>
   );
}
