import { Quote } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { testimonials } from '@data/testimonials'

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Success Stories"
          title="Girls Who Dared, Girls Who Did"
          subtitle="Real stories from real young women who transformed their futures through GirlyTech."
          center
          className="mb-14"
        />

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="group bg-gray-50 hover:bg-navy-950 rounded-3xl p-8 transition-all duration-300 border border-gray-100 hover:border-transparent"
            >
              <Quote className="w-8 h-8 text-pink-500 mb-5 group-hover:text-pink-400 transition-colors" />
              <p className="text-gray-700 group-hover:text-white/75 text-base leading-relaxed transition-colors">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-7 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <cite className="not-italic font-bold text-sm text-navy-950 group-hover:text-white transition-colors block">{t.name}</cite>
                  <span className="text-xs text-gray-400 group-hover:text-white/45 transition-colors">{t.role}</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-pink-600 group-hover:text-pink-400 transition-colors">{t.program}</span>
                    <span className="text-gray-300 group-hover:text-white/20 transition-colors">·</span>
                    <span className="text-xs text-gray-400 group-hover:text-white/35 transition-colors">{t.year}</span>
                  </div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
