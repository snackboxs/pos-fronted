import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function Loading() {
   return (
      <div className="mt-5 flex flex-col items-center gap-4 justify-center">
         <Button variant="outline" disabled size="sm">
            <Spinner />
            Loading...
         </Button>
      </div>
   );
}
