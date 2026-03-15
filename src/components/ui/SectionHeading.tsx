'use client';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({ label, title, description, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      <span className="inline-block text-sm font-semibold tracking-widest text-gold-600 uppercase mb-3">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
