import { Button } from "../components/ui/button";
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import {
   Select,
   SelectContent, SelectItem, SelectTrigger,
   SelectValue
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/createNewAcc.api";

export type Action = "READ" | "WRITE" | "UPDATE" | "DELETE";

export type UserRole = "SUPERVISOR" | "ADMIN" | "CASHIER";

export interface SignUpFormInputs {
   userEmail: string;
   userName: string;
   password: string;
   role: UserRole;
   permissions: Action[];
}

export default function CreateNewAcc() {
   const [error, setError] = useState<string | null>();
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<SignUpFormInputs>({
      defaultValues: {
         role: "CASHIER",
         permissions: ["READ"],
      },
   });
   const navigate = useNavigate();

   const { mutate, isPending, isError } = useMutation({
      mutationFn: signUp,
      onSuccess: (data) => {
         toast.success("Account created successfully!");
         console.log(data);

         navigate("/login");
      },
      onError: (error: any) => {
         setError(error.message || "Sign up failed");
         toast.error("Something went wrong!");
      },
   });

   const onSubmit = (formData: SignUpFormInputs) => {
      mutate(formData);
   };

   // UID25110001
   return (
      <div className="flex justify-center items-center h-screen">
         <Card className="w-250 max-w-sm border-none shadow-md">
            <CardHeader className="mb-5">
               <CardTitle className="font-imperialscript text-center text-2xl mb-2">
                  Sign Up
               </CardTitle>
               <CardDescription>
                  {error && (
                     <div className="flex gap-2 justify-center items-center text-red-500 p-3 w-fit">
                        <CircleX size={16} />
                        username and password is unmatch
                     </div>
                  )}
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           {...register("userEmail", { required: true })}
                           id="email"
                           type="text"
                           placeholder="m@example.com"
                           required
                           onInput={() => setError(null)}
                        />
                     </div>
                     <div className="grid gap-2">
                        <Label htmlFor="username">UserName</Label>
                        <Input
                           {...register("userName", { required: true })}
                           id="username"
                           type="text"
                           placeholder="David"
                           required
                           onInput={() => setError(null)}
                        />
                     </div>

                     <div className="grid gap-2">
                        <div className="flex items-center">
                           <Label htmlFor="password">Password</Label>
                           <a
                              href="#"
                              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                           >
                              Forgot your password?
                           </a>
                        </div>
                        <Input
                           {...register("password", { required: true })}
                           id="password"
                           type="password"
                           required
                           onInput={() => setError(null)}
                        />
                     </div>
                     <div className="grid gap-2">
                        <Label>Role</Label>
                        <Controller
                           name="role"
                           control={control}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="SUPERVISOR">
                                       Supervisor
                                    </SelectItem>
                                    <SelectItem value="CASHIER">
                                       Cashier
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           )}
                        />
                     </div>
                     <div className="grid gap-2">
                        <Label>Permissions</Label>
                        <div className="flex flex-wrap gap-4 border p-3 rounded-md">
                           {["READ", "WRITE", "UPDATE", "DELETE"].map(
                              (action) => (
                                 <label
                                    key={action}
                                    className="flex items-center gap-2 cursor-pointer"
                                 >
                                    <input
                                       type="checkbox"
                                       value={action}
                                       {...register("permissions")}
                                       className="w-4 h-4"
                                    />
                                    <span className="text-sm">{action}</span>
                                 </label>
                              )
                           )}
                        </div>
                     </div>
                     <Button
                        type="submit"
                        className="w-ful cursor-pointer"
                        variant={"posDefault"}
                        disabled={isPending}
                     >
                        {isPending ? <Spinner /> : "Submit"}
                     </Button>
                  </div>
               </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
               <Button
                  // variant="outline"
                  className="w-full cursor-pointer"
                  disabled
               >
                  Continue with Google
               </Button>
               <div className="flex items-center justify-between w-full">
                  <p>Already have account?</p>
                  <CardAction>
                     <Button
                        className="text-blue-700"
                        variant="link"
                        onClick={() => navigate("/login")}
                     >
                        Login In
                     </Button>
                  </CardAction>
               </div>
            </CardFooter>
         </Card>
      </div>
   );
}
