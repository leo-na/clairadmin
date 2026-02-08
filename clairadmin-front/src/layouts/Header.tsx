import { NavLink } from "react-router-dom";

const linkBase =
  "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors";
const linkActive = "text-gray-900";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-900" />
            <span className="text-sm font-semibold tracking-tight text-gray-900">
              ClairAdmin
            </span>
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
              end
            >
              Accueil
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Mes dossiers
            </NavLink>
            <a className={linkBase} href="#aide">
              Aide
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Connexion
          </NavLink>

          <NavLink
            to="/wizard"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Préparer un dossier
          </NavLink>
        </div>
      </div>
    </header>
  );
}
