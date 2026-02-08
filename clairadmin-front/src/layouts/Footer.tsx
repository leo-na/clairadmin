export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 text-sm text-gray-600 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            © {new Date().getFullYear()} ClairAdmin. Tous droits réservés.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="hover:text-gray-900" href="#">
              Sécurité & données
            </a>
            <a className="hover:text-gray-900" href="#">
              Mentions légales
            </a>
            <a className="hover:text-gray-900" href="#">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
