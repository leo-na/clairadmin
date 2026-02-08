import { NavLink, useRouteError } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

export default function NotFound() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _err = useRouteError();

  return (
    <div className="mx-auto max-w-xl">
      <Card className="p-6">
        <h1 className="text-lg font-semibold text-gray-900">Page introuvable</h1>
        <p className="mt-1 text-sm text-gray-600">
          Cette page n’existe pas ou a été déplacée.
        </p>

        <div className="mt-5">
          <NavLink to="/">
            <Button variant="secondary">Retour à l’accueil</Button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
}
