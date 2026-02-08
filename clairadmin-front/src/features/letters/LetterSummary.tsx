import Card from "../../components/Card";
import type { LetterFormValues } from "./LetterForm";

type LetterSummaryProps = {
  values: LetterFormValues;
};

export default function LetterSummary({ values }: LetterSummaryProps) {
  return (
    <Card className="p-5">
      <p className="text-sm font-semibold text-gray-900">Résumé</p>
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <p>
          <span className="text-gray-500">Ton :</span> {values.tone}
        </p>
        <p>
          <span className="text-gray-500">Nom :</span> {values.fullName || "non renseigné"}
        </p>
        <p>
          <span className="text-gray-500">N° dossier :</span> {values.dossierNumber || "non renseigné"}
        </p>
      </div>
    </Card>
  );
}
