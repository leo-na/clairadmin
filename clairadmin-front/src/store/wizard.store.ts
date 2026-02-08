import { create } from "zustand";

type Situation = "etudiant" | "salarie" | "freelance" | "parent" | "prefecture";
type DmarcheType = "prefecture" | "location" | "caf" | "mutuelle" | "banque" | "impots";

type WizardState = {
  step: number;
  situation: Situation | null;
  dmarche: DmarcheType | null;

  setStep: (step: number) => void;
  setSituation: (situation: Situation) => void;
  setDmarche: (dmarche: DmarcheType) => void;
  reset: () => void;
};

export const useWizardStore = create<WizardState>((set) => ({
  step: 0,
  situation: null,
  dmarche: null,

  setStep: (step) => set({ step }),
  setSituation: (situation) => set({ situation }),
  setDmarche: (dmarche) => set({ dmarche }),

  reset: () =>
    set({
      step: 0,
      situation: null,
      dmarche: null,
    }),
}));
