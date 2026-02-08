import type { ID, ISODateString } from "./common.types";

export type LetterTone = "neutre" | "factuel" | "humain";

export type LetterModel = {
  id: ID;
  content: string;
  tone: LetterTone;
  createdAt: ISODateString;
};

export type LetterGeneratePayload = {
  tone: LetterTone;
  fullName: string;
  dossierNumber?: string;
  request: string;
  context: string;
  dates?: string;
  caseType?: string;
  situation?: string;
};
