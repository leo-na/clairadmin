export type ID = string;

export type ISODateString = string; // ex: "2026-02-07T12:34:56.000Z"

export type ApiResponse<T> = {
  data: T;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type Nullable<T> = T | null;

export type Status = "idle" | "loading" | "success" | "error";

export type Option<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
};
