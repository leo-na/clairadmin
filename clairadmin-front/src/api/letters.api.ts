import { httpClient } from "./httpClient";

export type GenerateLetterPayload = {
  tone: "neutre" | "factuel" | "humain";
  fullName: string;
  dossierNumber?: string;
  request: string;
  context: string;
  dates?: string;
  caseType?: string;
  situation?: string;
};

export type LetterDTO = {
  id: string;
  content: string;
  createdAt: string;
};

export const lettersApi = {
  generate: (payload: GenerateLetterPayload) =>
    httpClient.post<{ letter: LetterDTO }>("/api/letters/generate", payload),

  attachToDossier: (dossierId: string, letterId: string) =>
    httpClient.post<{ ok: true }>(`/api/dossiers/${dossierId}/letters/${letterId}/attach`),
};
