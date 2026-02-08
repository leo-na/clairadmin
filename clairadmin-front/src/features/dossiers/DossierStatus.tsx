import Badge from "../../components/Badge";

type DossierStatusProps = {
  missingRequiredCount: number;
};

export default function DossierStatus({ missingRequiredCount }: DossierStatusProps) {
  const complete = missingRequiredCount === 0;
  return (
    <Badge variant={complete ? "success" : "warning"}>
      {complete ? "Complet" : "En cours"}
    </Badge>
  );
}
