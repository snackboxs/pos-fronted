import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
   InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { CircleX, DollarSign, SquarePen, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/features/auth/authCheck";
import { useAppSelector } from "@/hooks";

interface MenuData {
   menuName: string;
   price: number;
   categoryId: string;
   description: string;
   quantity: number;
   uom: string;
}

function MyInputGroup({ children }: React.ComponentProps<typeof InputGroup>) {
   return (
      <InputGroup
         className="
               border-none 
               shadow-none 
               ring-0 
               has-[[data-slot=input-group-control]:focus-visible]:ring-0 
               has-[[data-slot=input-group-control]:focus-visible]:ring-offset-0 
                        
               [&_[data-slot=input-group-control]]:border-b-2 
               [&_[data-slot=input-group-control]]:border-gray-300
               [&_[data-slot=input-group-control]:focus]:border-gray-500
            "
      >
         {children}
      </InputGroup>
   );
}
function MyIconButton({
   children,
   onClick,
}: {
   children: React.ReactNode;
   onClick?: () => void;
}) {
   return (
      <InputGroupAddon align="inline-end">
         <Button
            variant={"outline"}
            className="bg-transparent cursor-pointer border-none border-t-transparent shadow-none hover:text-red-500 active:text-black"
            onClick={onClick}
         >
            {children}
         </Button>
      </InputGroupAddon>
   );
}
function MyLabel({ lablename }: { lablename: string }) {
   return (
      <Label htmlFor="name" className="mt-5 pl-3">
         {lablename}
      </Label>
   );
}

export default function AddNewItem() {
   const [imageSrc, setImageSrc] = useState<string>();
   const [imageFile, setImageFile] = useState<File | null>(null);
   const isAuth = useAppSelector(auth);
   const token = isAuth.token;
   const [error, setError] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<MenuData>();

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // first selected file
      if (!file) return;

      setImageFile(file); // backend ပို့ဖို့

      const reader = new FileReader();
      reader.onload = () => {
         setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
   };

   const onSubmit = async (data: MenuData) => {
      console.log("posting data statt");

      try {
         const res = await fetch(`/api/admin/menu`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               menuName: data.menuName,
               price: data.price,
               categoryId: data.categoryId,
               description: data.description,
               quantity: data.quantity,
               uom: "Qty",
            }),
         });
         if (!res.ok) {
            const msg = await res.json();
            console.log(msg);
            setError(true);
            return; // early exit
         }

         const result = await res.json();
         console.log("data created ", result);

         if (!imageFile) {
            alert("Image မရွေးရသေးပါ");
            return;
         }
         console.log("imageFile found", imageFile);

         const formData = new FormData();
         formData.append("file", imageFile); //  backend schema name

         console.log("formaData", formData);

         const imgres = await fetch(
            `/api/admin/menu/image-upload/${result.data.menuId}`,
            {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${token}`,
               },
               body: formData,
            }
         );
         console.log("imgres fetching");

         if (!imgres.ok) {
            const imgMsg = await imgres.json();
            console.log("Image upload error:", imgMsg);
            setError(true);
            return;
         }
         const resultdata = await imgres.json();
         console.log(resultdata);

         reset();
         setImageFile(null);
         setImageSrc(undefined);
      } catch (err) {
         console.error("Submit error: bllo", err);
         setError(true);
      }
   };
   return (
      <>
         <div className="mt-5 flex">
            <div className="mr-10 h-fit w-[310px] p-[10px] flex flex-col items-center shadow-md rounded-md hover:shadow-xl hover:scale-101 transition-transform duration-300">
               <img
                  src={imageSrc || `/src/images/addimg.png`}
                  alt="img"
                  className="h-[300px]  mb-3 w-[300px] object-contain"
               />
               <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  className="hidden"
                  onChange={handleImageChange}
               />

               <Button
                  className="w-full cursor-pointer bg-transparent hover:border-gray-400 hover:text-green-600"
                  onClick={() =>
                     document.getElementById("file-upload")?.click()
                  }
                  variant={"outline"}
               >
                  <SquarePen />
               </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="max-w-lg min-w-sm relative">
                  <div className="shadow-md hover:shadow-xl p-2 hover:scale-105 transition-transform duration-300 rounded-md">
                     {/* CHANGE: MyLable -> MyLabel */}
                     <MyLabel lablename="Name" />
                     <MyInputGroup>
                        <InputGroupInput
                           type="text"
                           id="menuName" // CHANGE: unique id
                           {...register("menuName", { required: true })}
                        />
                        {/* CHANGE: Added reset functionality */}
                        <MyIconButton onClick={() => reset({ menuName: "" })}>
                           <CircleX />
                        </MyIconButton>
                     </MyInputGroup>

                     <MyLabel lablename="Price" />
                     <MyInputGroup>
                        <InputGroupInput
                           type="number"
                           min={0} // CHANGE: min added
                           id="price"
                           {...register("price", { required: true })}
                        />
                        <InputGroupAddon>
                           <DollarSign />
                        </InputGroupAddon>
                        <MyIconButton onClick={() => reset({ price: 0 })}>
                           <CircleX />
                        </MyIconButton>
                     </MyInputGroup>

                     <MyLabel lablename="Description" />
                     <MyInputGroup>
                        <InputGroupTextarea
                           {...register("description", { required: true })}
                        />
                        <MyIconButton
                           onClick={() => reset({ description: "" })}
                        >
                           <CircleX />
                        </MyIconButton>
                     </MyInputGroup>

                     <MyLabel lablename="Quantity" />
                     <MyInputGroup>
                        <InputGroupInput
                           type="number"
                           min={0} // CHANGE: min added
                           id="quantity"
                           {...register("quantity", { required: true })}
                        />
                        <InputGroupAddon>
                           <DollarSign />
                        </InputGroupAddon>
                        <MyIconButton onClick={() => reset({ quantity: 0 })}>
                           <CircleX />
                        </MyIconButton>
                     </MyInputGroup>

                     <MyLabel lablename="Category" />
                     <MyInputGroup>
                        <InputGroupInput
                           type="text"
                           id="categoryId" // CHANGE: unique id
                           {...register("categoryId", { required: true })}
                        />
                        <MyIconButton onClick={() => reset({ categoryId: "" })}>
                           <CircleX />
                        </MyIconButton>
                     </MyInputGroup>

                     {/* CHANGE: Error message */}
                     {error && (
                        <p className="text-red-500 mt-2">
                           Something went wrong. Try again!
                        </p>
                     )}

                     <div className="h-10"></div>
                  </div>

                  <Button
                     type="submit"
                     className="absolute right-0 mt-15 w-[100px] cursor-pointer shadow-md"
                     variant={"posDefault"}
                  >
                     Save
                  </Button>
               </div>
            </form>
         </div>
      </>
   );
}
