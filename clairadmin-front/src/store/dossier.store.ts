import { create } from "zustand";

export type DossierStatus = "draft" | "complete";

export type Dossier = {
  id: string;
  type: string;
  situation?: string;
  status: DossierStatus;
};

type DossierState = {
  current: Dossier | null;
  setCurrent: (dossier: Dossier) => void;
  clear: () => void;
};

export const useDossierStore = create<DossierState>((set) => ({
  current: null,

  setCurrent: (dossier) => set({ current: dossier }),
  clear: () => set({ current: null }),
}));
