import { NavLink } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

type Dmarche = {
  title: string;
  description: string;
  path: string;
  tag?: string;
};

const DEMARCHES: Dmarche[] = [
  {
    title: "Préfecture / Police",
    description:
      "Préparez un dossier conforme, avec pièces séparées et lettre explicative si nécessaire.",
    path: "/wizard?type=prefecture",
    tag: "Prioritaire",
  },
  {
    title: "Location",
    description: "Constituez un dossier complet à envoyer à un propriétaire ou une agence.",
    path: "/wizard?type=location",
  },
  {
    title: "CAF",
    description: "Rassemblez les pièces demandées selon votre situation et votre démarche.",
    path: "/wizard?type=caf",
  },
  {
    title: "Mutuelle",
    description: "Préparez les documents utiles pour l’adhésion, le remboursement ou une demande.",
    path: "/wizard?type=mutuelle",
  },
  {
    title: "Banque",
    description: "Montez un dossier clair pour une ouverture, un prêt ou une demande spécifique.",
    path: "/wizard?type=banque",
  },
  {
    title: "Impôts",
    description: "Centralisez et organisez les justificatifs utiles pour vos déclarations et demandes.",
    path: "/wizard?type=impots",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Préparez vos dossiers administratifs sans erreur ni stress.
        </h1>
        <p className="max-w-2xl text-sm text-gray-600">
          Checklists personnalisées, documents bien nommés, dossiers prêts à envoyer et
          génération de lettre explicative lorsque c’est demandé.
        </p>

        <div className="flex flex-wrap gap-3">
          <NavLink to="/wizard">
            <Button>Préparer un dossier</Button>
          </NavLink>
          <NavLink to="/dashboard">
            <Button variant="secondary">Voir mes dossiers</Button>
          </NavLink>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-lg font-semibold text-gray-900">Choisir une démarche</h2>
          <p className="text-sm text-gray-500">Commencez sans créer de compte.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DEMARCHES.map((d) => (
            <NavLink key={d.title} to={d.path} className="group">
              <Card className="p-5 transition-colors group-hover:border-gray-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{d.title}</p>
                    <p className="text-sm text-gray-600">{d.description}</p>
                  </div>

                  {d.tag ? (
                    <span className="rounded-full bg-gray-900 px-2.5 py-1 text-xs font-medium text-white">
                      {d.tag}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 text-sm font-medium text-gray-900">
                  Commencer <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </Card>
            </NavLink>
          ))}
        </div>
      </section>

      <section id="aide" className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">1. Checklist</p>
          <p className="mt-1 text-sm text-gray-600">
            Nous listons les pièces attendues selon votre situation et votre démarche.
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">2. Dossier conforme</p>
          <p className="mt-1 text-sm text-gray-600">
            Documents organisés, bien nommés, et exportables en PDF ou fichiers séparés.
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-900">3. Lettre explicative</p>
          <p className="mt-1 text-sm text-gray-600">
            Quand c’est nécessaire, générez une lettre structurée et factuelle.
          </p>
        </Card>
      </section>
    </div>
  );
}
