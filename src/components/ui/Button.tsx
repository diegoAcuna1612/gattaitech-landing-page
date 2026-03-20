interface ButtonProps {
  variant?: 'energy' | 'outline' | 'secondary';
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({
  variant = 'energy',
  children,
  className = '',
  href,
  onClick,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 py-3 font-sans text-sm cursor-pointer';

  const variantClasses: Record<string, string> = {
    energy: 'btn-energy',
    outline: 'btn-outline',
    secondary:
      'bg-surface-high text-secondary font-semibold rounded-md transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_16px_rgba(233,195,73,0.2)]',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
