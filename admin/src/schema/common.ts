import { IconType } from "react-icons";

export interface AdminLoginFieldSchema {
  name: string;
  password: string;
}

export interface SidebarMenuDataSchema {
  id: number;
  name: string;
  path: string;
  icon: ReturnType<IconType>;
}

export interface Wrapper<T> {
  message: string;
  success: boolean;
  data: T;
}
