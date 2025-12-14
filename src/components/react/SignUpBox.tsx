import { Button } from "../ui/button";
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LogIn } from "lucide-react";
import LoginBox from "./LoginBox";
import { DialogClose } from "@radix-ui/react-dialog";

interface SignUpBoxProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onSwitchToLogin: () => void;
}

export default function SignUpBox({
   open,
   onOpenChange,
   onSwitchToLogin,
}: SignUpBoxProps) {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="w-fit">
            <Card className="w-250 max-w-sm border-none shadow-none bg-white">
               <CardHeader className="mb-5">
                  <CardTitle className="font-imperialscript text-center text-xl ">
                     Sign Up
                  </CardTitle>
                  <CardDescription className="text-center">
                     Enter your email below to create an account
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form>
                     <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                           <Label htmlFor="email">Email</Label>
                           <Input
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              required
                           />
                        </div>
                        <div className="grid gap-2">
                           <Label htmlFor="password">New Password</Label>
                           <Input id="password" type="password" required />
                           <Label htmlFor="password">Re Password</Label>
                           <Input id="password" type="password" required />
                        </div>
                        <Button
                           type="submit"
                           className="w-full bg-blue-700 text-white"
                        >
                           Login
                        </Button>
                     </div>
                  </form>
               </CardContent>
               <CardFooter className="flex-col gap-2">
                  <Button variant="outline" className="w-full">
                     Continue with Google
                  </Button>
                  <div className="flex items-center justify-between w-full">
                     <p>Do you have account?</p>
                     <CardAction>
                        <Button
                           className="text-blue-700"
                           variant="link"
                           onClick={onSwitchToLogin}
                        >
                           Login
                        </Button>
                     </CardAction>
                  </div>
               </CardFooter>
            </Card>
         </DialogContent>
      </Dialog>
   );
}

// {
//    /* <Card className="w-250 max-w-sm bg-white"></Card>; */
// }

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// interface SignUpBoxProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSwitchToLogin: () => void;
// }

// export default function SignUpBox({ open, onOpenChange, onSwitchToLogin }: SignUpBoxProps) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-fit">
//         <DialogHeader>
//           <DialogTitle className="text-center text-xl font-imperialscript">
//             Sign Up
//           </DialogTitle>
//           <DialogDescription className="text-center">
//             Create a new account
//           </DialogDescription>
//         </DialogHeader>

//         <form className="flex flex-col gap-4 mt-4">
//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" placeholder="m@example.com" required />
//           </div>

//           <div>
//             <Label htmlFor="password">New Password</Label>
//             <Input id="password" type="password" required />
//             <Label htmlFor="repassword">Re-enter Password</Label>
//             <Input id="repassword" type="password" required />
//           </div>

//           <Button type="submit" className="w-full bg-blue-700 text-white">
//             Sign Up
//           </Button>
//         </form>

//         <p className="text-center mt-3">
//           Already have an account?{" "}
//           <Button variant="link" className="text-blue-700" onClick={onSwitchToLogin}>
//             Login
//           </Button>
//         </p>
//       </DialogContent>
//     </Dialog>
//   );
// }
