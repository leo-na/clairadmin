import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const alertStyles = cva("rounded-xl border p-4 text-sm", {
  variants: {
    variant: {
      info: "border-gray-200 bg-white text-gray-700",
      success: "border-green-200 bg-green-50 text-green-800",
      warning: "border-amber-200 bg-amber-50 text-amber-900",
      error: "border-red-200 bg-red-50 text-red-800",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type AlertProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof alertStyles>;

export default function Alert({ title, children, className, variant }: AlertProps) {
  return (
    <div className={twMerge(alertStyles({ variant }), className)}>
      {title ? <p className="mb-1 font-medium">{title}</p> : null}
      <div className="text-sm">{children}</div>
    </div>
  );
}
