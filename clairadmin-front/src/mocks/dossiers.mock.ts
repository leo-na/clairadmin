import type { CaseType, DossierDTO, DocumentDTO } from "../api/dossiers.api";

export const mockCases: { type: CaseType; label: string }[] = [
  { type: "prefecture", label: "Préfecture / Police" },
  { type: "location", label: "Location" },
  { type: "caf", label: "CAF" },
  { type: "mutuelle", label: "Mutuelle" },
  { type: "banque", label: "Banque" },
  { type: "impots", label: "Impôts" },
];

export function makeMockDossier(type: CaseType, situation: any): DossierDTO {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    type,
    situation,
    createdAt: now,
    updatedAt: now,
    status: "draft",
  };
}

export function makeMockDocuments(): DocumentDTO[] {
  const now = new Date().toISOString();
  return [
    {
      id: crypto.randomUUID(),
      name: "01_Piece_identite.pdf",
      mimeType: "application/pdf",
      size: 240_000,
      createdAt: now,
    },
    {
      id: crypto.randomUUID(),
      name: "02_Justificatif_domicile.pdf",
      mimeType: "application/pdf",
      size: 310_000,
      createdAt: now,
    },
  ];
}
