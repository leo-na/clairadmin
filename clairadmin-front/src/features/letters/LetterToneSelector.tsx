import Button from "../../components/Button";

export type LetterTone = "neutre" | "factuel" | "humain";

type LetterToneSelectorProps = {
  value: LetterTone;
  onChange: (tone: LetterTone) => void;
};

export default function LetterToneSelector({ value, onChange }: LetterToneSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-700">Ton</p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={value === "neutre" ? "primary" : "secondary"}
          onClick={() => onChange("neutre")}
        >
          Neutre
        </Button>
        <Button
          type="button"
          size="sm"
          variant={value === "factuel" ? "primary" : "secondary"}
          onClick={() => onChange("factuel")}
        >
          Très factuel
        </Button>
        <Button
          type="button"
          size="sm"
          variant={value === "humain" ? "primary" : "secondary"}
          onClick={() => onChange("humain")}
        >
          Plus humain
        </Button>
      </div>
    </div>
  );
}
