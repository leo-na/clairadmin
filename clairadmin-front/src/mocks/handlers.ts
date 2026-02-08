import { http, HttpResponse } from "msw";
import { mockCases, makeMockDossier, makeMockDocuments } from "./dossiers.mock";
import { makeMockLetter } from "./letters.mock";

export const handlers = [
  http.get("/api/cases", () => {
    return HttpResponse.json({ cases: mockCases });
  }),

  http.post("/api/dossiers", async ({ request }) => {
    const body = (await request.json()) as { type: any; situation: any };
    const dossier = makeMockDossier(body.type, body.situation);
    return HttpResponse.json({ dossier });
  }),

  http.get("/api/dossiers/:id", ({ params }) => {
    const dossierId = String(params.id);
    const now = new Date().toISOString();
    const dossier = {
      id: dossierId,
      type: "prefecture",
      situation: "prefecture",
      createdAt: now,
      updatedAt: now,
      status: "draft",
    };
    const documents = makeMockDocuments();
    return HttpResponse.json({ dossier, documents });
  }),

  http.post("/api/letters/generate", async ({ request }) => {
    const body = (await request.json()) as any;
    const letter = makeMockLetter(body);
    return HttpResponse.json({ letter });
  }),

  http.post("/api/dossiers/:id/letters/:letterId/attach", () => {
    return HttpResponse.json({ ok: true });
  }),
];
