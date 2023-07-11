import { IconType } from "react-icons";

export interface SidebarMenuDataSchema {
  id: number;
  name: string;
  path: string;
  icon: ReturnType<IconType>;
}
