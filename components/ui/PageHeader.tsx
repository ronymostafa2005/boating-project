interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-gray-200 bg-gray-50 py-16 sm:py-20">
      <div className="container-luxury text-center">
        <h1 className="heading-section mb-4 text-gold-gradient">{title}</h1>
        {subtitle && (
          <p className="mx-auto max-w-2xl text-gray-600">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
