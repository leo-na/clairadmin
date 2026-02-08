import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition " +
    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] " +
    "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
  
  {
    variants: {
      variant: {
        primary: "bg-gray-900 text-white hover:bg-gray-800",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700",
        
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export default function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={twMerge(buttonStyles({ variant, size }), className)} {...props} />;
}
