export interface UserListSchema {
  success: boolean;
  message: string;
  users: User[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
}
