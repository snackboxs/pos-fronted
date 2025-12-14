// import type { Data } from "@/features/data/dataSlice";

import {
   InputGroup,
   InputGroupAddon, InputGroupInput, InputGroupTextarea
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { CircleX, DollarSign, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
// import { productData } from "../../src/features/data/dataSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
function MyLable({ lablename }: { lablename: string }) {
   return (
      <Label htmlFor="name" className="mt-5 pl-3">
         {lablename}
      </Label>
   );
}

export default function EditItem() {
   // const data = useSelector(productData);
   // const { id } = useParams();
   
   // const currentData = data.menuList.find((data) => data.menuId === id);

   // if (!currentData) {
   //    return <div>Item not found</div>;
   // }

   // const [name, setName] = useState(currentData?.menuName);
   // const [description, setDescription] = useState(currentData?.description);
   // const [price, setPrice] = useState(currentData?.price);
   // const [quantity, setQuantity] = useState(currentData?.inventory.quantity);
   // const [imageSrc, setImageSrc] = useState(currentData?.imageUrl);
   // const [category, setCategory] = useState(currentData.category.categoryName)

   // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const file = e.target.files?.[0]; // first selected file
   //    if (file) {
   //       const reader = new FileReader();
   //       reader.onload = () => {
   //          setImageSrc(reader.result as string); // update image source
   //       };
   //       reader.readAsDataURL(file); // convert file to base64
   //    }
   // };
   
   return (
      <>
         hello
      </>
      // <div className="mt-5 flex">
      //    <div className="mr-10 h-fit w-[310px] p-[10px] flex flex-col items-center shadow-md rounded-md hover:shadow-xl hover:scale-101 transition-transform duration-300">
      //       <img
      //          src={imageSrc}
      //          alt="img"
      //          className="h-[300px]  mb-3 w-[300px] object-contain"
      //       />
      //       <input
      //          type="file"
      //          accept="image/*"
      //          id="file-upload"
      //          className="hidden"
      //          onChange={handleImageChange}
      //       />

      //       <Button
      //          className="w-full cursor-pointer bg-transparent hover:border-gray-400 hover:text-green-600"
      //          onClick={() => document.getElementById("file-upload")?.click()}
      //          variant={"outline"}
      //       >
      //          <SquarePen />
      //       </Button>
      //    </div>
      //    <div className="max-w-lg min-w-sm relative">
      //       <div className=" shadow-md hover:shadow-xl p-2 hover:scale-101 transition-transform duration-300 rounded-md">
      //          <MyLable lablename="Name" />
      //          <MyInputGroup>
      //             <InputGroupInput
      //                value={name}
      //                onChange={(e) => setName(e.target.value)}
      //                type="text"
      //                id="name"
      //             />
      //             <MyIconButton onClick={() => setName("")}>
      //                <CircleX />
      //             </MyIconButton>
      //          </MyInputGroup>
      //          <MyLable lablename="Price" />
      //          <MyInputGroup>
      //             <InputGroupInput
      //                value={price}
      //                onChange={(e) => setPrice(Number(e.target.value))}
      //                type="number"
      //                id="price"
      //             />
      //             <InputGroupAddon>
      //                <DollarSign />
      //             </InputGroupAddon>
      //             <MyIconButton onClick={() => setPrice(0)}>
      //                <CircleX />
      //             </MyIconButton>
      //          </MyInputGroup>
      //          <MyLable lablename="Description" />
      //          <MyInputGroup>
      //             <InputGroupTextarea
      //                value={description}
      //                onChange={(e) => setDescription(e.target.value)}
      //             />
      //             <MyIconButton onClick={() => setDescription("")}>
      //                <CircleX />
      //             </MyIconButton>
      //          </MyInputGroup>
      //          <MyLable lablename="Quantity" />
      //          <MyInputGroup>
      //             <InputGroupInput
      //                value={quantity}
      //                onChange={(e) => setQuantity(Number(e.target.value))}
      //                type="number"
      //                id="price"
      //             />
      //             <InputGroupAddon>
      //                <DollarSign />
      //             </InputGroupAddon>
      //             <MyIconButton onClick={() => setQuantity(0)}>
      //                <CircleX />
      //             </MyIconButton>
      //          </MyInputGroup>
      //          <MyLable lablename="Category" />
      //          <MyInputGroup>
      //             <InputGroupInput
      //                value={category}
      //                onChange={(e) => setCategory(e.target.value)}
      //                type="text"
      //                id="name"
      //             />
      //             <MyIconButton onClick={() => setCategory("")}>
      //                <CircleX />
      //             </MyIconButton>
      //          </MyInputGroup>
      //          <div className="h-10"></div>
      //       </div>
      //       <Button
      //          className="absolute right-0 mt-15 w-[100px] cursor-pointer shadow-md "
      //          variant={"posDefault"}
      //       >
      //          Save
      //       </Button>
      //    </div>
      // </div>
   );
}
