import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
