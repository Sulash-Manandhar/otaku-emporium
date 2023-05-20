import { BiUserCircle } from "react-icons/bi";
import { GiLaurelCrown } from "react-icons/gi";
import { SidebarMenuDataSchema } from "../schema/common";

export const SidebarData: SidebarMenuDataSchema[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: GiLaurelCrown,
  },
  {
    id: 2,
    name: "User",
    path: "/user",
    icon: BiUserCircle,
  },
];
