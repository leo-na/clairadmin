import type { ID, ISODateString } from "./common.types";
import type { DocumentModel } from "./document.types";

export type CaseType =
  | "prefecture"
  | "location"
  | "caf"
  | "mutuelle"
  | "banque"
  | "impots";

export type SituationType =
  | "etudiant"
  | "salarie"
  | "freelance"
  | "parent"
  | "prefecture";

export type DossierStatus = "draft" | "complete" | "sent";

export type DossierModel = {
  id: ID;
  type: CaseType;
  situation: SituationType;

  status: DossierStatus;

  createdAt: ISODateString;
  updatedAt: ISODateString;

  documents: DocumentModel[];
};
