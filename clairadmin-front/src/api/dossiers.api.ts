import { httpClient } from "./httpClient";

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

export type DossierDTO = {
  id: string;
  type: CaseType;
  situation: SituationType;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "complete";
};

export type DocumentDTO = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export type CreateDossierPayload = {
  type: CaseType;
  situation: SituationType;
};

export const dossiersApi = {
  listCases: () => httpClient.get<{ cases: { type: CaseType; label: string }[] }>("/api/cases"),

  createDossier: (payload: CreateDossierPayload) =>
    httpClient.post<{ dossier: DossierDTO }>("/api/dossiers", payload),

  getDossier: (id: string) =>
    httpClient.get<{ dossier: DossierDTO; documents: DocumentDTO[] }>(`/api/dossiers/${id}`),

  patchDossier: (id: string, patch: Partial<DossierDTO>) =>
    httpClient.patch<{ dossier: DossierDTO }>(`/api/dossiers/${id}`, patch),

  deleteDocument: (dossierId: string, docId: string) =>
    httpClient.del<{ ok: true }>(`/api/dossiers/${dossierId}/documents/${docId}`),

  // Upload document: souvent multipart/form-data côté back, on laisse l’implémentation au back.
  // Ici on garde la signature pour le contrat.
};
