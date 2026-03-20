const footerColumns = [
  {
    title: 'Servicios',
    links: [
      { label: 'Apps Web a Medida', href: '#' },
      { label: 'IA y Machine Learning', href: '#' },
      { label: 'Arquitectura Cloud', href: '#' },
      { label: 'Plataformas Empresariales', href: '#' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nosotros', href: '#' },
      { label: 'Casos de Éxito', href: '#case-studies' },
      { label: 'Carreras', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Documentación', href: '#' },
      { label: 'Política de Privacidad', href: '#' },
      { label: 'Términos de Servicio', href: '#' },
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
              Fusionando visión con ingeniería de precisión para ofrecer experiencias digitales transformadoras a empresas globales.
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
            © 2025 GattaiTech. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-sans text-xs text-on-surface-muted transition-colors duration-200 hover:text-primary"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="font-sans text-xs text-on-surface-muted transition-colors duration-200 hover:text-primary"
            >
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
