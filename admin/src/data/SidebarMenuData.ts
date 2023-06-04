import { BiUserCircle } from "react-icons/bi";
import { GiAmpleDress } from "react-icons/gi";
import { SidebarMenuDataSchema } from "../schema/common";

export const SidebarData: SidebarMenuDataSchema[] = [
  {
    id: 1,
    name: "User",
    path: "/user",
    icon: BiUserCircle,
  },
  {
    id: 2,
    name: "Apparel",
    path: "/apparels",
    icon: GiAmpleDress,
  },
];
