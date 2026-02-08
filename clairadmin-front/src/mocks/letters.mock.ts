import type { GenerateLetterPayload } from "../api/letters.api";

export function makeMockLetter(payload: GenerateLetterPayload) {
  const content = [
    payload.fullName || "[Nom Prénom]",
    payload.dossierNumber ? `N° dossier : ${payload.dossierNumber}` : "",
    "",
    "Objet : Demande",
    "",
    payload.request || "[Décrivez votre demande]",
    "",
    payload.context || "[Expliquez votre situation actuelle et ce qui a changé]",
    payload.dates ? `\nÉléments de dates : ${payload.dates}` : "",
    "",
    "Je vous remercie par avance de l’attention portée à ma demande.",
    "",
    "Cordialement,",
    payload.fullName || "[Nom Prénom]",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date().toISOString(),
  };
}
