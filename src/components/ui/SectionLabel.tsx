interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({
  children,
  className = "",
  ...props
}: SectionLabelProps) {
  return (
    <span
      {...props}
      className={`inline-block text-xs font-semibold tracking-[0.2em] text-[var(--algovia-green-light)] uppercase ${className}`}
    >
      {children}
    </span>
  );
}
