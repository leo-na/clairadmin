import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../auth/useAuth";
import { isValidEmail } from "../utils/validators";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, restore, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  // si l'utilisateur venait d'une route protégée
  const from = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from || "/dashboard";
  }, [location.state]);

  useEffect(() => {
    restore();
  }, [restore]);

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  // ✅ async obligatoire
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Veuillez entrer un email valide.");
      return;
    }

    if (!password.trim()) {
      setError("Veuillez entrer un mot de passe.");
      return;
    }

    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      // si loginApi throw une erreur
      setError("Email ou mot de passe incorrect.");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card className="p-6">
        <h1 className="text-lg font-semibold text-gray-900">Connexion</h1>
        <p className="mt-1 text-sm text-gray-600">
          Connecte-toi pour accéder à ton espace.
        </p>

        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            placeholder="email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error || undefined}
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          <Button className="w-full" type="submit">
            Se connecter
          </Button>

          <div className="pt-2 text-center text-sm text-gray-600">
            <NavLink to="/" className="hover:text-gray-900">
              Retour à l’accueil
            </NavLink>
          </div>
        </form>
      </Card>
    </div>
  );
}
