type Step = {
  label: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number; // 0-based
};

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        {steps.map((s, idx) => {
          const done = idx < currentStep;
          const active = idx === currentStep;

          return (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <div
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium",
                  done || active ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-600",
                ].join(" ")}
              >
                {idx + 1}
              </div>

              <div className="min-w-0">
                <div className={active ? "text-sm font-medium text-gray-900" : "text-sm text-gray-600"}>
                  {s.label}
                </div>
              </div>

              {idx !== steps.length - 1 ? (
                <div className={done ? "h-px flex-1 bg-gray-900" : "h-px flex-1 bg-gray-200"} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
