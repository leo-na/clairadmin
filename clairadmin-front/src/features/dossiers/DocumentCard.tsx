import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

export type DocumentModel = {
  id: string;
  name: string;
  sizeLabel: string;
  status: "ready" | "warning";
};

type DocumentCardProps = {
  doc: DocumentModel;
  onRemove?: (id: string) => void;
};

export default function DocumentCard({ doc, onRemove }: DocumentCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">{doc.name}</p>
          <p className="mt-1 text-xs text-gray-500">{doc.sizeLabel}</p>
        </div>

        <div className="shrink-0">
          <Badge variant={doc.status === "ready" ? "success" : "warning"}>
            {doc.status === "ready" ? "OK" : "À vérifier"}
          </Badge>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="ghost" size="sm" type="button">
          Renommer (MVP)
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => onRemove?.(doc.id)}
        >
          Supprimer
        </Button>
      </div>
    </Card>
  );
}
