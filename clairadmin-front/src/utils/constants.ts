import type { CaseType, SituationType } from "../types/dossier.types";

export const CASE_LABELS: Record<CaseType, string> = {
  prefecture: "Préfecture / Police",
  location: "Location",
  caf: "CAF",
  mutuelle: "Mutuelle",
  banque: "Banque",
  impots: "Impôts",
};

export const SITUATION_LABELS: Record<SituationType, string> = {
  etudiant: "Étudiant",
  salarie: "Salarié",
  freelance: "Freelance",
  parent: "Parent",
  prefecture: "Préfecture / Police",
};
