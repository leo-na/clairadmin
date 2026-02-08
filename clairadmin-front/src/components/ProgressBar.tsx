type ProgressBarProps = {
  value: number; // 0..100
};

export default function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-gray-900 transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500">{clamped}% complété</div>
    </div>
  );
}
