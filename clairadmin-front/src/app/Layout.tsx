import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Container from "../layouts/Container";
import { useScrollTop } from "../utils/useScrollTop";

export default function Layout() {
  useScrollTop();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-6">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
    </div>
  );
}
