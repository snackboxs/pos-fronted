import { useAppSelector, useAppDispatch } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import style from "../css/stockStyle.module.css";
import type { MenuData } from "@/types/backendData.types";
import { Button } from "@/components/ui/button";
import { CircleX, EllipsisVertical, MoreHorizontalIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { selectStockData } from "@/features/data/backendDataSlice";
import {
   fetchMenus,
   setPaginationParams,
} from "@/features/data/backendDataSlice";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

//Icon
import { Check } from "lucide-react";

//REDUX SLICE
import { deleteMenu } from "@/features/data/dataThunks";
import { resetStatus } from "@/features/data/dataHandleSlice";
import { setCardStatusIdle } from "@/features/data/backendDataSlice";

export default function Stock() {
   const dispatch = useAppDispatch();
   const [data, setData] = useState<MenuData[]>([]);
   const [showNewDialog, setShowNewDialog] = useState(false);
   const [showShareDialog, setShowShareDialog] = useState(false);
   const [showEditDialog, setShowEditDailog] = useState(false);
   const [selectedMenuId, setSelectedMenuId] = useState<string | undefined>(
      undefined
   );

   const {
      menuList,
      page,
      size,
      status: stockStatus,
   } = useAppSelector(selectStockData);
   const { status: deleteStatus, error } = useAppSelector(
      (state) => state.dataHandle
   );
   useEffect(() => {
      if (stockStatus === "idle") {
         dispatch(fetchMenus({ scope: "stock", page, size }));
      }
   }, [stockStatus, page, size]);
   console.log(stockStatus);

   const handleMore = () => {
      dispatch(setPaginationParams({ scope: "stock", page: page + 1 }));
   };

   const handleDelete = (menuId: string) => {
      dispatch(deleteMenu(menuId));
   };

   useEffect(() => {
      if (deleteStatus === "success") {
         toast("Delete Successful", {
            icon: <Check />,
            duration: 3000,
            position: "top-center",
            style: {
               color: "green",
            },
         });
         dispatch(fetchMenus({ scope: "stock", page, size, reset: true }));
         dispatch(setCardStatusIdle());
         setShowNewDialog(false);
         dispatch(resetStatus());
      } else if (deleteStatus === "error") {
         alert("Error: " + error);
         dispatch(resetStatus());
      }
   }, [deleteStatus, error]);
   return (
      <>
         <div> </div>
         <table className="mt-5 border-collapse border border-gray-400 table-fixed">
            <thead>
               <tr className={style.tr}>
                  <th
                     className={`${style.th} border border-gray-300 text-center`}
                  >
                     <Checkbox />
                  </th>
                  <th
                     className={`${style.th} border border-gray-300`}
                     colSpan={2}
                  >
                     Product
                  </th>
                  <th className={`${style.th} border border-gray-300`}>
                     In Stock
                  </th>
                  <th className={`${style.th} border border-gray-300`}>
                     Category
                  </th>
                  <th className={`${style.th} border border-gray-300`}>
                     Price
                  </th>
                  <th className={`${style.th} border border-gray-300`}>
                     Action
                  </th>
               </tr>
            </thead>
            <tbody>
               {menuList.map((data) => (
                  <tr key={data.menuId} className={style.tr}>
                     <td
                        className={`${style.td} border border-gray-300 text-center`}
                     >
                        <Checkbox />
                     </td>
                     <td className={`${style.td} border border-gray-300`}>
                        <img src={data.imageUrl} alt="" />
                     </td>
                     <td className={`${style.td} border border-gray-300`}>
                        {data.menuName}
                     </td>
                     <td className={`${style.td} border border-gray-300`}>
                        {data.inventory.quantity}
                     </td>
                     <td className={`${style.td} border border-gray-300`}>
                        {data.category.categoryName}
                     </td>
                     <td className={`${style.td} border border-gray-300`}>
                        {data.price}$
                     </td>
                     <td
                        className={`${style.td} border border-gray-300 text-center`}
                     >
                        <DropdownMenu modal={false}>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 variant="myOutline"
                                 aria-label="Open menu"
                                 size="icon-sm"
                              >
                                 <EllipsisVertical />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent className="w-40" align="end">
                              <DropdownMenuLabel>
                                 File Actions
                              </DropdownMenuLabel>
                              <DropdownMenuGroup>
                                 <DropdownMenuItem
                                    onSelect={() => {
                                       setShowNewDialog(true);
                                       setSelectedMenuId(data.menuId);
                                    }}
                                 >
                                    Delete...
                                 </DropdownMenuItem>
                                 <DropdownMenuItem
                                    onSelect={() => setShowShareDialog(true)}
                                 >
                                    Edit...
                                 </DropdownMenuItem>
                                 <DropdownMenuItem disabled>
                                    Download
                                 </DropdownMenuItem>
                              </DropdownMenuGroup>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {stockStatus === "loading" ? (
            <Spinner className="mx-auto mt-4" />
         ) : (
            <Button
               className="w-30 mx-auto mt-4 cursor-pointer"
               variant="outline"
               onClick={() => handleMore()}
            >
               More
            </Button>
         )}
         <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                     This will permanently delete this product from your stock.
                     This action cannot be undone.
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                     type="submit"
                     variant={"warning"}
                     onClick={() =>
                        selectedMenuId && handleDelete(selectedMenuId)
                     }
                  >
                     {deleteStatus === "loading" ? (
                        <Spinner className="mx-auto" />
                     ) : (
                        "Yes"
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
         <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Share File</DialogTitle>
                  <DialogDescription>
                     Anyone with the link will be able to view this file.
                  </DialogDescription>
               </DialogHeader>
               <FieldGroup className="py-3">
                  <Field>
                     <Label htmlFor="email">Email Address</Label>
                     <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="shadcn@vercel.com"
                        autoComplete="off"
                     />
                  </Field>
                  <Field>
                     <FieldLabel htmlFor="message">
                        Message (Optional)
                     </FieldLabel>
                     <Textarea
                        id="message"
                        name="message"
                        placeholder="Check out this file"
                     />
                  </Field>
               </FieldGroup>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Send Invite</Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
