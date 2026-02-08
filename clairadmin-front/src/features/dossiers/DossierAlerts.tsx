import Alert from "../../components/Alert";

type DossierAlertsProps = {
  missingRequiredCount: number;
  isPrefecture?: boolean;
};

export default function DossierAlerts({ missingRequiredCount, isPrefecture }: DossierAlertsProps) {
  return (
    <div className="space-y-3">
      {missingRequiredCount > 0 ? (
        <Alert variant="warning" title="Pièces manquantes">
          <p>Il manque {missingRequiredCount} document(s) obligatoire(s).</p>
        </Alert>
      ) : (
        <Alert variant="success" title="Dossier prêt">
          <p>Votre dossier est complet. Vous pouvez finaliser.</p>
        </Alert>
      )}

      {isPrefecture ? (
        <Alert variant="info" title="Conseil préfecture">
          <p>
            Préparez des fichiers séparés, bien nommés, et ajoutez une lettre explicative si elle est demandée.
          </p>
        </Alert>
      ) : null}
    </div>
  );
}
