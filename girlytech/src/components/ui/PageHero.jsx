export default function PageHero({ eyebrow, title, subtitle, variant = 'navy' }) {
  const bg = {
    navy: 'from-navy-950 via-navy-900 to-[#0d1f50]',
    pink: 'from-pink-800 via-pink-700 to-rose-600',
  }[variant] || 'from-navy-950 via-navy-900 to-[#0d1f50]'

  return (
    <section className={`relative pt-32 pb-20 lg:pb-28 bg-gradient-to-br ${bg} overflow-hidden`}>
      <div className="absolute inset-0 section-dots opacity-25" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-[0.15em] rounded-full mb-5">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-white/65 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
