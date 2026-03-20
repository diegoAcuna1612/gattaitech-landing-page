interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary ${className}`}
    >
      {children}
    </span>
  );
}
