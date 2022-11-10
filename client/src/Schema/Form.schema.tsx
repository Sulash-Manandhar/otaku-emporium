export type PinSchema = {
  pin1: number;
  pin2: number;
  pin3: number;
  pin4: number;
  pin5: number;
  pin6: number;
};

export type FormDataSchema = {
  name: formKey;
  email: formKey;
  password: formKey;
  confirmPassword: formKey;
};

export interface formKey {
  value: string;
  error: string;
}

export type formIdSchema = "name" | "email" | "password" | "confirmPassword";
