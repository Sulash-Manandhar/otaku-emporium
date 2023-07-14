import { Meta } from "./common";

export interface ApparelSchemaList {
  apparels: ApparelDetailSchema[];
  meta: Meta;
}

export interface ApparelDetailSchema {
  _id: string;
  name: string;
  price: number;
  color: string;
  size: SizeSchema;
  category: "sweatshirt" | "t-shirt" | "hoodie";
  description: string;
  keyword: string[];
  image: ImageSchema[];
  status: boolean;
}

export interface SizeSchema {
  small: number;
  medium: number;
  large: number;
}

export interface ImageSchema {
  name: string;
  path: string;
}
