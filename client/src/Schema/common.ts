export type formIdSchema = "name" | "email" | "password" | "confirm_password";

export type localUserInfoSchema = {
  id: string;
  name: string;
  email: string;
  url: string;
};

export type loginMutateDataSchema = {
  email: string;
  password: string;
  remember: boolean;
};
