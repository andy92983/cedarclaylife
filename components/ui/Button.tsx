import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-cedar-600 text-white hover:bg-cedar-700 shadow-sm",
  secondary: "bg-clay-500 text-white hover:bg-clay-600 shadow-sm",
  outline: "border-2 border-cedar-600 text-cedar-700 hover:bg-cedar-50",
  ghost: "text-cedar-700 hover:bg-cedar-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cedar-500",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
