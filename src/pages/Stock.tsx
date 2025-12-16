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
import { deleteMenu } from "@/features/data/deleMenuThunks";
import { dataHandle, resetStatus } from "@/features/data/dataHandleSlice";
import { setCardStatusIdle } from "@/features/data/backendDataSlice";
import { useForm } from "react-hook-form";
import { updateMenu } from "@/features/data/updateMenuThunks";

interface StockData {
   name: string;
   price: number;
   quantity: number;
   description: string;
   category: string;
}

const DEFAULT_IMG = "/images/no-image.png";

export default function Stock() {
   const dispatch = useAppDispatch();
   const [data, setData] = useState<MenuData[]>([]);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [showEditDialog, setShowEditDialog] = useState(false);
   const [selectedMenuId, setSelectedMenuId] = useState<string | undefined>(
      undefined
   );
   const [currentImg, setCurrentImg] = useState<string | undefined>(undefined);
   const {
      menuList,
      page,
      size,
      status: stockStatus,
   } = useAppSelector(selectStockData);

   const { status: deleteStatus, error: deleteError } = useAppSelector(
      (state) => state.dataHandle
   );
   const { status: updateStatus, error: updateError } =
      useAppSelector(dataHandle);

   const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
   } = useForm<StockData>({
      defaultValues: {
         name: "",
         price: 0,
         quantity: 0,
         description: "",
         category: "",
      },
   });

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
      if (deleteStatus.delete === "succeeded") {
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
         setShowDeleteDialog(false);
         dispatch(resetStatus());
      } else if (deleteStatus.delete === "failed") {
         alert("Error: " + deleteError);
         dispatch(resetStatus());
      }
   }, [deleteStatus, deleteError]);

   // set register default value
   const openEditDialog = (menu: MenuData) => {
      setSelectedMenuId(menu.menuId);
      setShowEditDialog(true);
      setCurrentImg(menu.imageUrl || DEFAULT_IMG);
      reset({
         name: menu.menuName,
         price: menu.price,
         quantity: menu.inventory.quantity,
         category: menu.category.categoryName,
         description: menu.description,
      });
   };

   const handleUpdateMenu = (formData: StockData) => {
      if (!selectedMenuId) return;

      const payload = {
         menuId: selectedMenuId,
         data: {
            menuName: formData.name,
            price: formData.price,
            quantity: formData.quantity,
            description: formData.description,
            categoryId: "C002",
            uom: "Qty",
         },
      };

      dispatch(updateMenu(payload));
   };
   useEffect(() => {
      if (updateStatus.update === "succeeded") {
         toast("Update Successful", {
            icon: <Check />,
            duration: 3000,
            position: "top-center",
            style: {
               color: "green",
            },
         });
         dispatch(fetchMenus({ scope: "stock", page, size, reset: true }));
         dispatch(setCardStatusIdle());
         setShowEditDialog(false);
         dispatch(resetStatus());
      } else if (updateStatus.update === "failed") {
         alert("Error: " + updateError);
         dispatch(resetStatus());
      }
   }, [deleteStatus, deleteError]);

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
                                       setShowDeleteDialog(true);
                                       setSelectedMenuId(data.menuId);
                                    }}
                                 >
                                    Delete...
                                 </DropdownMenuItem>
                                 <DropdownMenuItem
                                    onSelect={() => openEditDialog(data)}
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
         <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
                     {deleteStatus.delete === "loading" ? (
                        <Spinner className="mx-auto" />
                     ) : (
                        "Yes"
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
         <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
               <DialogTitle className="sr-only">Edit Product</DialogTitle>
               <DialogDescription className="sr-only">
                  Update the product details such as name, price, quantity, and
                  category.
               </DialogDescription>

               <DialogHeader className="border p-2 shadow-md">
                  <img
                     src={`${currentImg}`}
                     alt="img"
                     className="h-[200px] object-contain"
                  />
               </DialogHeader>
               <FieldGroup className="py-3">
                  <div className="grid grid-cols-2 gap-4">
                     <Field>
                        <Label htmlFor="name">Name</Label>
                        <Input
                           id="name"
                           type="text"
                           autoComplete="off"
                           {...register("name")}
                        />
                     </Field>
                     <Field>
                        <Label htmlFor="price">Price</Label>
                        <Input
                           id="price"
                           type="number"
                           {...register("price")}
                        />
                     </Field>
                  </div>
                  <Field>
                     <FieldLabel htmlFor="description">
                        Description (Optional)
                     </FieldLabel>
                     <Textarea
                        id="description"
                        placeholder="Check out this file"
                        {...register("description")}
                     />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                     <Field>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                           id="quantity"
                           type="number"
                           autoComplete="off"
                           {...register("quantity")}
                        />
                     </Field>
                     <Field>
                        <Label htmlFor="category">Category</Label>
                        <Input
                           id="category"
                           type="text"
                           {...register("category")}
                        />
                     </Field>
                  </div>
               </FieldGroup>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleSubmit(handleUpdateMenu)}>
                     {updateStatus.update === "loading" ? <Spinner /> : "Save"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}
