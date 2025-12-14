import CardContainer from "../components/react/CardContainer";
import MyPagination from "@/components/react/MyPagination";
import Category from "../components/react/Category";

export default function () {
   return (
      <>
         <Category />
         <div className="mt-50"></div>
         <CardContainer />
         <div className="flex-1"></div>
         <MyPagination />
      </>
   );
}
