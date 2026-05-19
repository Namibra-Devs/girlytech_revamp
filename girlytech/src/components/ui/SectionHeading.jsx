export default function SectionHeading({ eyebrow, title, subtitle, center = false, light = false, className = '' }) {
  return (
    <div className={`${center ? 'text-center mx-auto max-w-2xl' : ''} ${className}`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3 px-3 py-1 rounded-full ${
          light ? 'bg-white/15 text-white/90' : 'bg-blue-50 text-blue-700'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display font-bold leading-tight text-3xl sm:text-4xl lg:text-5xl ${
        light ? 'text-white' : 'text-navy-950'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          light ? 'text-white/65' : 'text-gray-500'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
