import Card from "../../components/Card";
import type { LetterFormValues } from "./LetterForm";

function buildLetter(values: LetterFormValues) {
  const heading =
    values.tone === "factuel"
      ? "Objet : Demande — éléments factuels"
      : values.tone === "humain"
      ? "Objet : Demande — explications"
      : "Objet : Demande";

  return [
    values.fullName ? values.fullName : "[Nom Prénom]",
    values.dossierNumber ? `N° dossier : ${values.dossierNumber}` : "",
    "",
    heading,
    "",
    values.request ? values.request : "[Décrivez votre demande]",
    "",
    values.context
      ? values.context
      : "[Expliquez votre situation actuelle et ce qui a changé]",
    "",
    values.dates ? `Éléments de dates : ${values.dates}` : "",
    "",
    "Je vous remercie par avance de l’attention portée à ma demande.",
    "",
    "Cordialement,",
    values.fullName ? values.fullName : "[Nom Prénom]",
  ]
    .filter(Boolean)
    .join("\n");
}

type LetterPreviewProps = {
  values: LetterFormValues;
};

export default function LetterPreview({ values }: LetterPreviewProps) {
  const preview = buildLetter(values);

  return (
    <Card className="p-5">
      <p className="text-sm font-semibold text-gray-900">Aperçu</p>
      <p className="mt-1 text-sm text-gray-600">Format A4, style administratif.</p>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-900">
          {preview}
        </pre>
      </div>
    </Card>
  );
}
