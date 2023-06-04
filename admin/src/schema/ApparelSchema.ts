export interface ApparelListSchema {
  apparels: ApparelDetailsSchema[];
  totalCount: number;
}

export interface ApparelDetailsSchema {
  _id: string;
  name: string;
  price: number;
  color: string;
  size: SizeSchema;
  category: "hoodie" | "sweetshirt" | "t-shirt";
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
