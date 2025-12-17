import OrderList from "./OrderList"

export default function MenuCard() {
   return (
      <div
         className="sticky right-0 flex flex-col top-4 bg-gray-300/20 w-[350px] rounded-2xl shadow-lg overflow-hidden"
         style={{ height: "calc(100vh - 2rem)" }}
      >
         <OrderList />
      </div>
   );
}
