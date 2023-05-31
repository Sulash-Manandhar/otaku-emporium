export interface UserListSchema {
  success: boolean;
  message: string;
  users: User[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  gender: "male" | "female" | "others";
  contact: number;
  address: {
    city: string;
    state: string;
    zip_code: number;
  };
  verification: boolean;
  ban: boolean;
}
