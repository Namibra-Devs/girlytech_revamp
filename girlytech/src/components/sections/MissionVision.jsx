import { useEffect, useRef } from 'react'
import { Target, Eye } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { useReveal } from '@hooks/useReveal'

const values = [
  { label: 'Inclusivity',  desc: 'Every girl belongs here' },
  { label: 'Excellence',   desc: 'We raise the bar, always' },
  { label: 'Community',    desc: 'Stronger together' },
  { label: 'Innovation',   desc: 'Ideas that change the world' },
]

export default function MissionVision() {
  const revealRef = useReveal()
  const blob1Ref  = useRef(null)
  const blob2Ref  = useRef(null)

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${y * 0.06}px)`
        if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${y * -0.04}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div ref={blob1Ref} className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-700/6 rounded-full blur-3xl will-change-transform pointer-events-none" />
      <div ref={blob2Ref} className="absolute -bottom-24 -left-24 w-80 h-80 bg-navy-950/5 rounded-full blur-3xl will-change-transform pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div data-reveal>
          <SectionHeading
            eyebrow="Who We Are"
            title="Purpose-Driven & Community-Led"
            subtitle="We believe in the transformative power of education and are committed to making STEM accessible for every girl, especially those from underserved communities."
            center
            className="mb-16"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission card */}
          <div data-reveal data-reveal-from="left" data-reveal-delay="120" className="relative group bg-gradient-to-br from-navy-950 to-navy-900 rounded-xl p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-blue-700/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-700/20 transition-all duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-blue-700/20 border border-blue-700/25 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-blue-400" />
              </div>
              <span className="inline-block px-3 py-1 bg-blue-700/15 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Our Mission
              </span>
              <p className="text-white text-xl lg:text-2xl font-display font-bold leading-snug">
                GirlyTech empowers girls and young women to pursue careers in STEM by giving them the skills and mentorship needed to succeed.
              </p>
              <div className="mt-7 h-px bg-gradient-to-r from-blue-700/50 to-transparent" />
              <p className="mt-5 text-white/55 text-sm leading-relaxed">
                We provide hands-on training, mentorship connections, and clear career pathways that make tech a real and achievable future for every girl.
              </p>
            </div>
          </div>

          {/* Vision card */}
          <div data-reveal data-reveal-from="right" data-reveal-delay="220" className="relative group bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-all duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Our Vision
              </span>
              <p className="text-white text-xl lg:text-2xl font-display font-bold leading-snug">
                We envision a future where women and girls lead in technology, contributing innovative solutions to global challenges.
              </p>
              <div className="mt-7 h-px bg-gradient-to-r from-white/30 to-transparent" />
              <p className="mt-5 text-white/65 text-sm leading-relaxed">
                A world where diversity in tech is the norm — where every brilliant mind, regardless of gender or background, shapes our technological future.
              </p>
            </div>
          </div>
        </div>

        {/* Values row */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.map(({ label, desc }, i) => (
            <div
              key={label}
              data-reveal
              data-reveal-delay={320 + i * 70}
              className="group bg-gray-50 hover:bg-navy-950 rounded-2xl p-6 transition-all duration-300 cursor-default"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-700 mb-4 group-hover:scale-150 transition-transform" />
              <h4 className="font-bold text-sm text-navy-950 group-hover:text-white transition-colors">{label}</h4>
              <p className="text-xs text-gray-400 group-hover:text-white/50 mt-1 transition-colors">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
