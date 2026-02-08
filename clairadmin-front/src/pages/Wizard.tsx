import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Stepper from "../components/Stepper";
import Card from "../components/Card";
import Button from "../components/Button";
import { useCreateDossier } from "../features/dossiers/hooks";
import type { CaseType, SituationType } from "../api/dossiers.api";

const steps = [{ label: "Situation" }, { label: "Démarche" }, { label: "Validation" }];

const situationOptions: { value: SituationType; label: string; description: string }[] = [
  { value: "etudiant", label: "Étudiant", description: "Dossier location, CAF, mutuelle, etc." },
  { value: "salarie", label: "Salarié", description: "Dossier banque, location, impôts, etc." },
  { value: "freelance", label: "Freelance", description: "Dossier banque, impôts, justificatifs." },
  { value: "parent", label: "Parent", description: "Dossier CAF, école, mutuelle, etc." },
  { value: "prefecture", label: "Préfecture / Police", description: "Démarches sensibles et dossiers stricts." },
];

const dmarcheOptions: { value: CaseType; label: string; description: string }[] = [
  { value: "prefecture", label: "Préfecture / Police", description: "Titre de séjour, renouvellement, régularisation." },
  { value: "location", label: "Location", description: "Dossier locataire complet et bien organisé." },
  { value: "caf", label: "CAF", description: "Pièces adaptées à votre situation." },
  { value: "mutuelle", label: "Mutuelle", description: "Adhésion, remboursements, demandes." },
  { value: "banque", label: "Banque", description: "Ouverture, prêt, justificatifs." },
  { value: "impots", label: "Impôts", description: "Déclarations, justificatifs, demandes." },
];

export default function Wizard() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const initialType = (params.get("type") || "") as CaseType;
  const initialStep = initialType ? 1 : 0;

  const [step, setStep] = useState<number>(initialStep);
  const [situation, setSituation] = useState<SituationType | null>(null);
  const [dmarche, setDmarche] = useState<CaseType | null>(initialType || null);

  const createDossier = useCreateDossier();

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(situation);
    if (step === 1) return Boolean(dmarche);
    return true;
  }, [step, situation, dmarche]);

  function next() {
    if (!canNext) return;
    if (step < 2) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function startDossier() {
    if (!dmarche || !situation) return;

    const res = await createDossier.mutateAsync({
      type: dmarche,
      situation,
    });

    const id = res.dossier.id;
    navigate(`/dossiers/${id}?type=${dmarche}&situation=${situation}`);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-900">Préparer un dossier</h1>
        <p className="text-sm text-gray-600">
          Répondez à quelques questions. Vous obtenez une checklist et un dossier prêt à envoyer.
        </p>
      </div>

      <Stepper steps={steps} currentStep={step} />

      {step === 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Votre situation</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {situationOptions.map((o) => {
              const selected = situation === o.value;
              return (
                <button key={o.value} onClick={() => setSituation(o.value)} className="text-left">
                  <Card className={["p-5 transition-colors", selected ? "border-gray-900" : "hover:border-gray-300"].join(" ")}>
                    <p className="text-sm font-semibold text-gray-900">{o.label}</p>
                    <p className="mt-1 text-sm text-gray-600">{o.description}</p>
                  </Card>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Votre démarche</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {dmarcheOptions.map((o) => {
              const selected = dmarche === o.value;
              return (
                <button key={o.value} onClick={() => setDmarche(o.value)} className="text-left">
                  <Card className={["p-5 transition-colors", selected ? "border-gray-900" : "hover:border-gray-300"].join(" ")}>
                    <p className="text-sm font-semibold text-gray-900">{o.label}</p>
                    <p className="mt-1 text-sm text-gray-600">{o.description}</p>
                  </Card>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="space-y-4">
          <Card className="p-5">
            <p className="text-sm font-semibold text-gray-900">Récapitulatif</p>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <p><span className="text-gray-500">Situation :</span> {situation ?? "Non renseignée"}</p>
              <p><span className="text-gray-500">Démarche :</span> {dmarche ?? "Non renseignée"}</p>
            </div>
          </Card>

          <Button onClick={startDossier} disabled={createDossier.isPending}>
            {createDossier.isPending ? "Création..." : "Créer mon dossier"}
          </Button>

          {createDossier.isError ? (
            <p className="text-sm text-red-600">Erreur: impossible de créer le dossier.</p>
          ) : null}
        </section>
      ) : null}

      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={back} disabled={step === 0 || createDossier.isPending}>
          Retour
        </Button>

        {step < 2 ? (
          <Button onClick={next} disabled={!canNext || createDossier.isPending}>
            Continuer
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
