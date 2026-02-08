import { useMutation, useQuery } from "@tanstack/react-query";
import { dossiersApi, type CreateDossierPayload } from "../../api/dossiers.api";

export function useCases() {
  return useQuery({
    queryKey: ["cases"],
    queryFn: () => dossiersApi.listCases(),
  });
}

export function useCreateDossier() {
  return useMutation({
    mutationFn: (payload: CreateDossierPayload) => dossiersApi.createDossier(payload),
  });
}

export function useDossier(id: string) {
  return useQuery({
    queryKey: ["dossier", id],
    queryFn: () => dossiersApi.getDossier(id),
    enabled: Boolean(id),
  });
}
