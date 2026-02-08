import Card from "../../components/Card";
import ProgressBar from "../../components/ProgressBar";

type DossierProgressProps = {
  percent: number; // 0..100
  subtitle?: string;
};

export default function DossierProgress({ percent, subtitle }: DossierProgressProps) {
  return (
    <Card className="p-5">
      <p className="text-sm font-semibold text-gray-900">Avancement</p>
      {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
      <div className="mt-3">
        <ProgressBar value={percent} />
      </div>
    </Card>
  );
}
