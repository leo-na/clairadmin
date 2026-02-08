import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({ label, hint, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label className="text-xs font-medium text-gray-700">{label}</label>
      ) : null}

      <input
        className={twMerge(
          "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
          error ? "border-red-300 focus:border-red-600 focus:ring-red-600/10" : "",
          className
        )}
        {...props}
      />

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}
