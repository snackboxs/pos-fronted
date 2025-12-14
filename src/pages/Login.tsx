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
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { loginUser, auth } from "@/features/auth/authCheck";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

interface LoginFormInputs {
   email: string;
   password: string;
}

export default function Login() {
   const [error, setError] = useState<string | null>();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormInputs>();
   const { isLoading } = useAppSelector(auth);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   // const errorNoti = () => toast("username and password is unmatch");
   const onSubmit = async (data: LoginFormInputs) => {
      const result = await dispatch(
         loginUser({
            userId: data.email,
            password: data.password,
         })
      );
      console.log(result);

      if (loginUser.fulfilled.match(result)) {
         navigate("/");
      } else {
         toast("Username and password do not match", {
            icon: <CircleX size={18} className="text-red-500" />,
            duration: 3000,
            position: "top-center",
            style: {
               color: "red",
            },
         });
         setError(result.payload || "Login failed");
      }
   };

   return (
      <div className="flex justify-center items-center h-screen">
         <Card className="w-250 max-w-sm border-none shadow-none bg-white">
            <CardHeader className="mb-5">
               <CardTitle className="font-imperialscript text-center text-2xl mb-2">
                  Log in
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
                           {...register("email", { required: true })}
                           id="email"
                           type="text"
                           placeholder="m@example.com"
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
                     <Button
                        type="submit"
                        className="w-full bg-blue-700 text-white cursor-pointer"
                     >
                        {isLoading && <Spinner />}
                        {!isLoading && <>Login</>}
                     </Button>
                  </div>
               </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
               <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  disabled
               >
                  Continue with Google
               </Button>
               <div className="flex items-center justify-between w-full">
                  <p>Don't you have account?</p>
                  <CardAction>
                     <Button className="text-blue-700" variant="link">
                        Sign Up
                     </Button>
                  </CardAction>
               </div>
            </CardFooter>
         </Card>
      </div>
   );
}
