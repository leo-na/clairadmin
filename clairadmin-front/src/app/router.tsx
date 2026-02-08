import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import Home from "../pages/Home";
import Wizard from "../pages/Wizard";
import Dossier from "../pages/Dossier";
import Letter from "../pages/Letter";
import ExportPage from "../pages/Export";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "wizard", element: <Wizard /> },
      { path: "dossiers/:id", element: <Dossier /> },
      { path: "dossiers/:id/lettre", element: <Letter /> },
      { path: "dossiers/:id/export", element: <ExportPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
