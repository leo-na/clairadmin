import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LetterToneSelector, { type LetterTone } from "./LetterToneSelector";

export type LetterFormValues = {
  tone: LetterTone;
  fullName: string;
  dossierNumber: string;
  request: string;
  context: string;
  dates: string;
};

type LetterFormProps = {
  values: LetterFormValues;
  onChange: (patch: Partial<LetterFormValues>) => void;
  onSave?: () => void;
  onDownload?: () => void;
};

export default function LetterForm({ values, onChange, onSave, onDownload }: LetterFormProps) {
  return (
    <Card className="p-5">
      <p className="text-sm font-semibold text-gray-900">Informations</p>
      <p className="mt-1 text-sm text-gray-600">
        Remplissez les champs. L’aperçu se met à jour automatiquement.
      </p>

      <div className="mt-4 space-y-4">
        <LetterToneSelector
          value={values.tone}
          onChange={(tone) => onChange({ tone })}
        />

        <Input
          label="Nom Prénom"
          value={values.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
        />

        <Input
          label="Numéro de dossier (si disponible)"
          value={values.dossierNumber}
          onChange={(e) => onChange({ dossierNumber: e.target.value })}
        />

        <Input
          label="Votre demande (1 phrase)"
          placeholder="Ex: Je sollicite le renouvellement de mon titre de séjour."
          value={values.request}
          onChange={(e) => onChange({ request: e.target.value })}
        />

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700">Votre situation (résumé)</label>
          <textarea
            className="min-h-24 w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            placeholder="Ex: Je suis actuellement étudiant et j’ai changé d’adresse le …"
            value={values.context}
            onChange={(e) => onChange({ context: e.target.value })}
          />
          <p className="text-xs text-gray-500">
            Restez factuel, avec des dates si possible.
          </p>
        </div>

        <Input
          label="Dates importantes"
          placeholder="Ex: Contrat du 01/09/2025 au 30/06/2026"
          value={values.dates}
          onChange={(e) => onChange({ dates: e.target.value })}
        />

        <div className="flex gap-2 pt-2">
          <Button type="button" onClick={onSave}>
            Enregistrer (MVP)
          </Button>
          <Button type="button" variant="secondary" onClick={onDownload}>
            Télécharger (MVP)
          </Button>
        </div>
      </div>
    </Card>
  );
}
