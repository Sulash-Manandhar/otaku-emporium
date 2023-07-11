import { SidebarMenuDataSchema } from "@src/schema/common";
import { BiUserCircle } from "react-icons/bi";
import { GiAmpleDress, GiLaurelCrown } from "react-icons/gi";

export const SidebarData: SidebarMenuDataSchema[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: GiLaurelCrown,
  },
  {
    id: 2,
    name: "User",
    path: "/user",
    icon: BiUserCircle,
  },
  {
    id: 3,
    name: "Apparel",
    path: "/apparels",
    icon: GiAmpleDress,
  },
];
