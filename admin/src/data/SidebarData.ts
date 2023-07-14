import { SidebarMenuDataSchema } from "@src/schema/common";
import { BiUserCircle } from "react-icons/bi";
import { GiClothes, GiLaurelCrown } from "react-icons/gi";

export const SidebarNavData: SidebarMenuDataSchema[] = [
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
    icon: GiClothes,
  },
];
