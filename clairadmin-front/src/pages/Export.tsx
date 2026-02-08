import { NavLink, useParams, useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function ExportPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const type = params.get("type");
  const situation = params.get("situation");

  const isPrefecture = type === "prefecture";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">Finalisation</h1>
          <p className="text-sm text-gray-600">
            Dossier: <span className="font-mono">{id}</span>
          </p>
        </div>

        <NavLink to={`/dossiers/${id}?type=${type ?? ""}&situation=${situation ?? ""}`}>
          <Button variant="secondary">Retour au dossier</Button>
        </NavLink>
      </div>

      <Alert variant="info" title="Vérification finale">
        <p>
          Ce mode est un MVP front. L’export réel sera branché sur le back. Choisissez le format
          attendu par la plateforme.
        </p>
      </Alert>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">PDF unique</p>
          <p className="mt-1 text-sm text-gray-600">
            Recommandé pour location, banque, mutuelle.
          </p>
          <div className="mt-4">
            <Button className="w-full" variant="secondary">
              Exporter en PDF (MVP)
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">Fichiers séparés</p>
          <p className="mt-1 text-sm text-gray-600">
            Recommandé pour préfecture et plateformes officielles.
          </p>
          <div className="mt-4">
            <Button className="w-full" variant={isPrefecture ? "primary" : "secondary"}>
              Exporter fichiers séparés (MVP)
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">Lien sécurisé</p>
          <p className="mt-1 text-sm text-gray-600">
            Partage temporaire avec expiration.
          </p>
          <div className="mt-4">
            <Button className="w-full" variant="secondary">
              Générer un lien (MVP)
            </Button>
          </div>
        </Card>
      </div>

      {isPrefecture ? (
        <Alert variant="warning" title="Conseil préfecture">
          <p>
            Préparez des fichiers séparés, bien nommés, et ajoutez une lettre explicative si elle est demandée.
          </p>
        </Alert>
      ) : null}
    </div>
  );
}
