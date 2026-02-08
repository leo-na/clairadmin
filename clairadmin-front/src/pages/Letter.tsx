import { useMemo, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useGenerateLetter } from "../features/letters/hooks";

type Tone = "neutre" | "factuel" | "humain";

export default function Letter() {
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const type = params.get("type");
  const situation = params.get("situation");

  const [tone, setTone] = useState<Tone>("neutre");
  const [fullName, setFullName] = useState("");
  const [dossierNumber, setDossierNumber] = useState("");
  const [request, setRequest] = useState("");
  const [context, setContext] = useState("");
  const [dates, setDates] = useState("");

  const gen = useGenerateLetter();
  const apiContent = gen.data?.letter.content ?? "";

  const preview = useMemo(() => {
    if (apiContent) return apiContent;

    const heading =
      tone === "factuel"
        ? "Objet : Demande — éléments factuels"
        : tone === "humain"
        ? "Objet : Demande — explications"
        : "Objet : Demande";

    return [
      fullName ? fullName : "[Nom Prénom]",
      dossierNumber ? `N° dossier : ${dossierNumber}` : "",
      "",
      heading,
      "",
      request ? request : "[Décrivez votre demande]",
      "",
      context ? context : "[Expliquez votre situation actuelle et ce qui a changé]",
      "",
      dates ? `Éléments de dates : ${dates}` : "",
      "",
      "Je vous remercie par avance de l’attention portée à ma demande.",
      "",
      "Cordialement,",
      fullName ? fullName : "[Nom Prénom]",
    ]
      .filter(Boolean)
      .join("\n");
  }, [apiContent, tone, fullName, dossierNumber, request, context, dates]);

  async function generate() {
    await gen.mutateAsync({
      tone,
      fullName,
      dossierNumber,
      request,
      context,
      dates,
      caseType: type ?? undefined,
      situation: situation ?? undefined,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">Lettre explicative</h1>
          <p className="text-sm text-gray-600">
            Dossier: <span className="font-mono">{id}</span>
          </p>
        </div>

        <NavLink to={`/dossiers/${id}?type=${type ?? ""}&situation=${situation ?? ""}`}>
          <Button variant="secondary">Retour au dossier</Button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">Informations</p>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700">Ton</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant={tone === "neutre" ? "primary" : "secondary"} size="sm" onClick={() => setTone("neutre")}>
                  Neutre
                </Button>
                <Button type="button" variant={tone === "factuel" ? "primary" : "secondary"} size="sm" onClick={() => setTone("factuel")}>
                  Très factuel
                </Button>
                <Button type="button" variant={tone === "humain" ? "primary" : "secondary"} size="sm" onClick={() => setTone("humain")}>
                  Plus humain
                </Button>
              </div>
            </div>

            <Input label="Nom Prénom" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Numéro de dossier (si disponible)" value={dossierNumber} onChange={(e) => setDossierNumber(e.target.value)} />
            <Input label="Votre demande (1 phrase)" value={request} onChange={(e) => setRequest(e.target.value)} />
            <Input label="Votre situation (résumé)" value={context} onChange={(e) => setContext(e.target.value)} />
            <Input label="Dates importantes" value={dates} onChange={(e) => setDates(e.target.value)} />

            <div className="flex gap-2 pt-2">
              <Button type="button" onClick={generate} disabled={gen.isPending}>
                {gen.isPending ? "Génération..." : "Générer via API (MSW)"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => gen.reset()}>
                Réinitialiser
              </Button>
            </div>

            {gen.isError ? <p className="text-sm text-red-600">Erreur génération.</p> : null}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">Aperçu</p>
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
            <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-900">{preview}</pre>
          </div>
        </Card>
      </div>
    </div>
  );
}
