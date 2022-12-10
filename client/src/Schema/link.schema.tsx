import { IconType } from "react-icons/lib";

export type LINK_SCHEMA = linkDetail[];
export type linkDetail = {
  id: number;
  name: string;
  icon: IconType;
  path: string;
};
