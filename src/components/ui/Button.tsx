import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline-light";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--gradient-brand)] text-white hover:opacity-90 shadow-[0_4px_24px_rgba(2,187,115,0.35)] border border-white/10",
  secondary:
    "bg-[var(--surface-card)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--algovia-border-strong)]",
  ghost:
    "bg-transparent text-[var(--algovia-green)] hover:text-[var(--algovia-green-light)] font-medium",
  "outline-light":
    "bg-transparent text-white border border-white/30 hover:bg-white/10",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  showArrow = false,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 disabled:opacity-50";

  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && <ArrowUpRight className="h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
