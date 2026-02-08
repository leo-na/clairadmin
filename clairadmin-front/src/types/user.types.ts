import type { ID, ISODateString } from "./common.types";

export type UserRole = "user" | "admin";

export type UserModel = {
  id: ID;
  email: string;
  role: UserRole;
  createdAt?: ISODateString;
};
