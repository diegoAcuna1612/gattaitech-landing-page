interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  className = '',
}: ServiceCardProps) {
  return (
    <div
      className={`group rounded-lg bg-surface p-6 card-hover ${className}`}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-surface-high text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-surface-dim">
        {icon}
      </div>
      <h3 className="mb-2 font-sans text-lg font-semibold text-on-surface">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-on-surface-muted">
        {description}
      </p>
    </div>
  );
}
