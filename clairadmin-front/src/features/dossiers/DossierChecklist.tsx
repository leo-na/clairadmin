import Card from "../../components/Card";
import Badge from "../../components/Badge";
import ChecklistItem, { type ChecklistItemModel } from "./ChecklistItem";

type DossierChecklistProps = {
  title?: string;
  items: ChecklistItemModel[];
  onToggleItem?: (id: string) => void;
};

export default function DossierChecklist({ title = "Checklist", items, onToggleItem }: DossierChecklistProps) {
  const missingRequired = items.filter((i) => i.required && i.status !== "added");
  const statusVariant = missingRequired.length === 0 ? "success" : "warning";
  const statusLabel = missingRequired.length === 0 ? "Complet" : "Incomplet";

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600">
            Cliquez sur un élément pour simuler l’ajout (MVP front).
          </p>
        </div>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>

      <div className="mt-4 divide-y divide-gray-100">
        {items.map((it) => (
          <ChecklistItem key={it.id} item={it} onToggle={onToggleItem} />
        ))}
      </div>
    </Card>
  );
}
