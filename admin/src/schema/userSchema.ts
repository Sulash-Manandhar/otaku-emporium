import { Meta } from "./common";

export interface UserListSchema {
  users: UserDetailSchema[];
  meta: Meta;
}

export interface UserDetailSchema {
  _id: string;
  name: string;
  email: string;
  gender: "male" | "female" | "other";
  contact: number;
  address: AddressInterfce;
  verification: boolean;
  ban: boolean;
}

export interface AddressInterfce {
  country: string;
  city: string;
  street_name: string;
  street_number: string;
  postal_code: string;
}
