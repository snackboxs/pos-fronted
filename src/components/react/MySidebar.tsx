import {
   Sidebar,
   SidebarHeader,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
   Home,
   Inbox,
   Cherry,
   ChevronUp,
   User2,
   Moon,
   Sun,
   ChartNoAxesColumn,
   Plus,
} from "lucide-react";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { theme, setTheme } from "../../features/theme/themeSlice";
import { useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/authCheck";
import { auth } from "@/features/auth/authCheck";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { Link } from "react-router-dom";

const menuItems = [
   { title: "Home", url: "/", icon: Home },
   { title: "Analytics Overview", url: "/admin/dashboard", icon: Inbox },
   { title: "Stock", url: "/stock", icon: ChartNoAxesColumn },
   { title: "Add New Item", url: "/addnewitm", icon: Plus },
];

export default function MySidebar() {
   const location = useLocation();
   const isCurrentPage = location.pathname;
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   // const [auth, setAuth] = useState(true);
   const { user, isAuthenticate, isLoading } = useAppSelector(auth);

   const currentTheme = useSelector(theme);
   const newTheme = currentTheme === "light" ? "dark" : "light";

   const activeClass =
      "bg-green-600 text-white shadow-lg hover:bg-green-700 hover:text-white";
   return (
      <>
         <Sidebar side="left" variant="sidebar" collapsible="icon">
            <SidebarHeader className="flex-row items-center">
               <Cherry size={30} />
               <h2 className="text-xl font-bold group-data-[collapsible=icon]:hidden">
                  My App
               </h2>
            </SidebarHeader>
            <SidebarContent>
               <SidebarGroup>
                  {/* <SidebarGroupLabel>Main</SidebarGroupLabel> */}
                  <SidebarGroupContent>
                     <SidebarMenu>
                        {menuItems.map((item, index) => (
                           <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton
                                 asChild
                                 className={`${
                                    isCurrentPage === item.url
                                       ? activeClass
                                       : "inactiveClasses"
                                 } `}
                              >
                                 <Link
                                    to={item.url}
                                    className="flex items-center gap-2"
                                 >
                                    <item.icon size={20} />
                                    <span>{item.title}</span>
                                 </Link>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
               <SidebarMenu>
                  <SidebarMenuItem>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <SidebarMenuButton className="cursor-pointer">
                              <User2 /> 
                              <p className="pl-2">{user ? user?.userName : "Micle"}</p>
                              <ChevronUp className="ml-auto" />
                           </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="top" className="w-50">
                           <DropdownMenuItem
                              onSelect={(e) => {
                                 e.preventDefault();
                                 dispatch(logoutUser());
                              }}
                              className="cursor-pointer"
                           >
                              {isLoading ? <Spinner /> : "Logout"}
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              className="justify-between cursor-pointer"
                              onClick={() => {
                                 dispatch(setTheme(newTheme));
                              }}
                           >
                              {currentTheme === "light" ? (
                                 <>
                                    Dark Mode <Moon />
                                 </>
                              ) : (
                                 <>
                                    Light Mode <Sun />
                                 </>
                              )}
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </SidebarMenuItem>
               </SidebarMenu>
            </SidebarFooter>
         </Sidebar>
      </>
   );
}
