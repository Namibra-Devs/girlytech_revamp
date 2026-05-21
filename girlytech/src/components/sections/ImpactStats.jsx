import { useEffect, useRef } from 'react'
import { Users, Heart, BookOpen } from 'lucide-react'
import { useReveal } from '@hooks/useReveal'

const stats = [
  { icon: Users,    value: '2,500+', label: 'Girls Empowered',  desc: 'Transforming lives across Ghana and beyond' },
  { icon: Heart,    value: '300+',   label: 'Scholarships',      desc: 'Removing every financial barrier to tech careers' },
  { icon: BookOpen, value: '95%',    label: 'Completion Rate',   desc: 'Among all enrolled program participants' },
]

export default function ImpactStats() {
  const revealRef = useReveal()
  const blobRef   = useRef(null)

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (blobRef.current) blobRef.current.style.transform = `translateY(${window.scrollY * -0.07}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0d1f50] relative overflow-hidden">
      <div className="absolute inset-0 section-dots opacity-25" />
      <div ref={blobRef} className="absolute right-0 top-0 w-[650px] h-[650px] bg-blue-700/15 rounded-full blur-3xl will-change-transform pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

      <div ref={revealRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map(({ icon: Icon, value, label, desc }, i) => (
            <div
              key={label}
              data-reveal
              data-reveal-from="scale"
              data-reveal-delay={i * 130}
              className="flex flex-col items-center text-center px-8 lg:px-14 py-12 lg:py-10 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-700/20 border border-blue-700/30 flex items-center justify-center mb-7 group-hover:bg-blue-700/35 transition-colors">
                <Icon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-6xl lg:text-7xl font-display font-black text-white tracking-tight">{value}</div>
              <div className="text-lg font-bold text-white mt-4">{label}</div>
              <div className="text-sm text-white/40 mt-2 max-w-xs leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
