import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badgeStyles = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        error: "bg-red-100 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = {
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof badgeStyles>;

export default function Badge({ className, variant, children }: BadgeProps) {
  return <span className={twMerge(badgeStyles({ variant }), className)}>{children}</span>;
}
