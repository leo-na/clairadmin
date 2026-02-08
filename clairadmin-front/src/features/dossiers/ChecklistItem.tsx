import Badge from "../../components/Badge";

export type ChecklistStatus = "missing" | "added" | "expired";

export type ChecklistItemModel = {
  id: string;
  label: string;
  required: boolean;
  status: ChecklistStatus;
  note?: string;
};

type ChecklistItemProps = {
  item: ChecklistItemModel;
  onToggle?: (id: string) => void;
};

export default function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  const badge =
    item.status === "added"
      ? { variant: "success" as const, text: "Ajouté" }
      : item.status === "expired"
      ? { variant: "error" as const, text: "Périmé" }
      : { variant: "default" as const, text: "Manquant" };

  return (
    <button
      type="button"
      onClick={() => onToggle?.(item.id)}
      className="flex w-full items-center justify-between gap-4 py-3 text-left"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {item.label}{" "}
          <span className="ml-2 text-xs font-medium text-gray-500">
            ({item.required ? "obligatoire" : "optionnel"})
          </span>
        </p>
        {item.note ? <p className="mt-1 text-xs text-gray-500">{item.note}</p> : null}
      </div>

      <div className="shrink-0">
        <Badge variant={badge.variant}>{badge.text}</Badge>
      </div>
    </button>
  );
}
