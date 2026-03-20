const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Custom Web Apps', href: '#' },
      { label: 'AI & Machine Learning', href: '#' },
      { label: 'Cloud Architecture', href: '#' },
      { label: 'Enterprise Platforms', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-lowest pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <span className="font-serif text-xl font-bold text-on-surface">
              GattaiTech
            </span>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-on-surface-muted">
              Fusing vision with precision engineering to deliver transformative
              digital experiences for global enterprises.
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-on-surface">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-on-surface-muted transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-outline-variant/15 pt-8 md:flex-row">
          <p className="font-sans text-xs text-on-surface-muted">
            © 2025 GattaiTech. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-sans text-xs text-on-surface-muted transition-colors duration-200 hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-xs text-on-surface-muted transition-colors duration-200 hover:text-primary"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
