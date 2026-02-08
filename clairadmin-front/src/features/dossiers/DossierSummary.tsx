import Card from "../../components/Card";

type DossierSummaryProps = {
  dossierId: string;
  type?: string | null;
  situation?: string | null;
};

export default function DossierSummary({ dossierId, type, situation }: DossierSummaryProps) {
  return (
    <Card className="p-5">
      <p className="text-sm font-semibold text-gray-900">Récapitulatif</p>
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <p>
          <span className="text-gray-500">ID :</span>{" "}
          <span className="font-mono">{dossierId}</span>
        </p>
        <p>
          <span className="text-gray-500">Démarche :</span> {type || "non précisée"}
        </p>
        <p>
          <span className="text-gray-500">Situation :</span> {situation || "non précisée"}
        </p>
      </div>
    </Card>
  );
}
