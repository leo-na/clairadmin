import { useMutation } from "@tanstack/react-query";
import { lettersApi, type GenerateLetterPayload } from "../../api/letters.api";

export function useGenerateLetter() {
  return useMutation({
    mutationFn: (payload: GenerateLetterPayload) => lettersApi.generate(payload),
  });
}
