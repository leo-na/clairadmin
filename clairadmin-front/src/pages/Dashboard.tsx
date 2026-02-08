import { NavLink } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

type DossierItem = {
  id: string;
  title: string;
  type: string;
  status: "incomplete" | "complete";
  updatedAt: string;
};

const demoDossiers: DossierItem[] = [
  {
    id: "demo-1",
    title: "Préfecture / Police",
    type: "prefecture",
    status: "incomplete",
    updatedAt: "Aujourd’hui",
  },
  {
    id: "demo-2",
    title: "Dossier location",
    type: "location",
    status: "complete",
    updatedAt: "Hier",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">Mes dossiers</h1>
          <p className="text-sm text-gray-600">
            Suivez vos dossiers en cours et reprenez où vous vous êtes arrêté.
          </p>
        </div>

        <NavLink to="/wizard">
          <Button>Préparer un dossier</Button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {demoDossiers.map((d) => (
          <Card key={d.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">{d.title}</p>
                <p className="mt-1 text-sm text-gray-600">Mis à jour: {d.updatedAt}</p>
              </div>
              <Badge variant={d.status === "complete" ? "success" : "warning"}>
                {d.status === "complete" ? "Complet" : "En cours"}
              </Badge>
            </div>

            <div className="mt-4 flex gap-2">
              <NavLink to={`/dossiers/${d.id}?type=${d.type}`}>
                <Button variant="secondary">Reprendre</Button>
              </NavLink>
              <NavLink to={`/dossiers/${d.id}/export?type=${d.type}`}>
                <Button variant="ghost">Exporter</Button>
              </NavLink>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
