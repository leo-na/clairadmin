import { useMemo, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import Alert from "../components/Alert";
import Skeleton from "../components/Skeleton";
import { useDossier } from "../features/dossiers/hooks";

type DocItem = {
  id: string;
  label: string;
  required: boolean;
  status: "missing" | "added" | "expired";
};

function getChecklist(type: string | null): DocItem[] {
  if (type === "prefecture") {
    return [
      { id: "id", label: "Pièce d’identité", required: true, status: "missing" },
      { id: "addr", label: "Justificatif de domicile (moins de 3 mois)", required: true, status: "missing" },
      { id: "photos", label: "Photos d’identité", required: true, status: "missing" },
      { id: "form", label: "Formulaire / demande", required: true, status: "missing" },
      { id: "letter", label: "Lettre explicative (si demandé)", required: false, status: "missing" },
    ];
  }
  if (type === "location") {
    return [
      { id: "id", label: "Pièce d’identité", required: true, status: "missing" },
      { id: "income", label: "Justificatif de revenus", required: true, status: "missing" },
      { id: "addr", label: "Justificatif de domicile", required: true, status: "missing" },
      { id: "tax", label: "Avis d’imposition", required: false, status: "missing" },
    ];
  }
  return [
    { id: "id", label: "Pièce d’identité", required: true, status: "missing" },
    { id: "addr", label: "Justificatif de domicile", required: true, status: "missing" },
  ];
}

export default function Dossier() {
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const type = params.get("type");
  const situation = params.get("situation");

  const dossierQuery = useDossier(id);

  const [items, setItems] = useState<DocItem[]>(() => getChecklist(type));

  function toggleAdded(itemId: string) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId ? { ...it, status: it.status === "added" ? "missing" : "added" } : it
      )
    );
  }

  const requiredCount = useMemo(() => items.filter((i) => i.required).length, [items]);
  const requiredAdded = useMemo(() => items.filter((i) => i.required && i.status === "added").length, [items]);
  const percent = useMemo(() => (requiredCount ? Math.round((requiredAdded / requiredCount) * 100) : 0), [requiredAdded, requiredCount]);
  const missingRequired = items.filter((i) => i.required && i.status !== "added");

  if (dossierQuery.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (dossierQuery.isError) {
    return <p className="text-sm text-red-600">Erreur: impossible de charger le dossier.</p>;
  }

  const apiDossier = dossierQuery.data?.dossier;
  const apiDocuments = dossierQuery.data?.documents ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">Dossier</h1>
          <p className="text-sm text-gray-600">
            ID: <span className="font-mono">{apiDossier?.id ?? id}</span> ·{" "}
            {type ? `Démarche: ${type}` : `Démarche: ${apiDossier?.type ?? "non précisée"}`} ·{" "}
            {situation ? `Situation: ${situation}` : `Situation: ${apiDossier?.situation ?? "non précisée"}`}
          </p>
          <p className="text-xs text-gray-500">
            Documents API (demo): {apiDocuments.length}
          </p>
        </div>

        <div className="flex gap-2">
          <NavLink to={`/dossiers/${id}/lettre?type=${type ?? ""}&situation=${situation ?? ""}`}>
            <Button variant="secondary">Lettre explicative</Button>
          </NavLink>
          <NavLink to={`/dossiers/${id}/export?type=${type ?? ""}&situation=${situation ?? ""}`}>
            <Button disabled={missingRequired.length > 0}>Finaliser</Button>
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Checklist</p>
              <p className="mt-1 text-sm text-gray-600">Cliquez pour simuler l’ajout (MVP).</p>
            </div>
            <Badge variant={missingRequired.length === 0 ? "success" : "warning"}>
              {missingRequired.length === 0 ? "Complet" : "Incomplet"}
            </Badge>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => toggleAdded(it.id)}
                className="flex w-full items-center justify-between gap-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {it.label}{" "}
                    <span className="ml-2 text-xs font-medium text-gray-500">
                      ({it.required ? "obligatoire" : "optionnel"})
                    </span>
                  </p>
                </div>
                <div className="shrink-0">
                  {it.status === "added" ? (
                    <Badge variant="success">Ajouté</Badge>
                  ) : it.status === "expired" ? (
                    <Badge variant="error">Périmé</Badge>
                  ) : (
                    <Badge>Manquant</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">Avancement</p>
          <div className="mt-3">
            <ProgressBar value={percent} />
          </div>

          <div className="mt-4 space-y-3">
            {missingRequired.length > 0 ? (
              <Alert variant="warning" title="Pièces manquantes">
                <p>Il manque {missingRequired.length} document(s) obligatoire(s).</p>
              </Alert>
            ) : (
              <Alert variant="success" title="Dossier prêt">
                <p>Votre dossier est complet. Vous pouvez finaliser.</p>
              </Alert>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
