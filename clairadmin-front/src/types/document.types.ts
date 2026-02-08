import type { ID, ISODateString } from "./common.types";

export type DocumentStatus = "missing" | "added" | "expired" | "ok" | "warning";

export type DocumentType =
  | "identity"
  | "residency"
  | "income"
  | "tax"
  | "photo"
  | "form"
  | "other";

export type DocumentModel = {
  id: ID;
  type: DocumentType;
  name: string;
  mimeType?: string;
  size?: number;
  createdAt?: ISODateString;

  // UX
  status: DocumentStatus;
  required: boolean;
  note?: string; // ex: "moins de 3 mois"
};
