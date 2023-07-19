import { IconType } from "react-icons";
export interface SidebarMenuDataSchema {
  id: number;
  name: string;
  path: string;
  icon: IconType;
}

export interface ListWrapper<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Meta {
  next: number | null;
  prev: number | null;
  current: number;
  totalCount: number;
}
