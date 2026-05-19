import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, ArrowLeft, ArrowRight as ArrowR, GraduationCap, Code2, Laptop, Brain, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ── Slide data ───────────────────────────────────────────────── */
const slides = [
  {
    id: 0,
    badge: '🎓 Applications Now Open',
    headline: ['Girls Who Code,', 'Lead the World'],
    gradientLine: 1,
    sub: 'GirlyTech empowers girls and young women to pursue careers in STEM by giving them the skills and mentorship needed to succeed.',
    cta1: { label: 'Explore Programs', to: '/programs' },
    cta2: { label: 'Our Story', to: '/about' },
    image: '/images/hero1.webp',
    orb1: '#3530d3ff',
    orb2: '#132cd1ff',
  },
  {
    id: 1,
    badge: '💻 12 Active Programs',
    headline: ['Your Journey', 'Starts Here'],
    gradientLine: 1,
    sub: 'From beginner bootcamps to advanced AI masterclasses — every program is designed with girls in mind. No experience needed.',
    cta1: { label: 'View Programs', to: '/programs' },
    cta2: { label: 'Apply Now', to: '/programs' },
    image: '/images/hero2.webp',
   orb1: '#3530d3ff',
    orb2: '#4f13d1ff',
  },
  {
    id: 2,
    badge: '⭐ 150+ Active Mentors',
    headline: ['Mentored', 'By the Best'],
    gradientLine: 1,
    sub: 'Connect with 150+ industry professionals from leading tech companies who are dedicated to your growth and success in STEM.',
    cta1: { label: 'Join Community', to: '/membership' },
    cta2: { label: 'Become a Mentor', to: '/volunteer' },
    image: '/images/hero3.webp',
   orb1: '#3530d3ff',
    orb2: '#4f13d1ff',
  },
  {
    id: 3,
    badge: '🏆 300+ Scholarships Awarded',
    headline: ['Funded Futures,', 'No Excuses'],
    gradientLine: 1,
    sub: 'Cost should never be a barrier to your tech future. Over 300 full scholarships awarded to girls from underserved communities.',
    cta1: { label: 'Apply for Scholarship', to: '/programs' },
    cta2: { label: 'Donate', to: '/donate' },
    image: '/images/hero1.webp',
orb1: '#3530d3ff',
    orb2: '#4f13d1ff',
  },
]

const avatars = [
  { icon: GraduationCap, color: '#e32d88ff' },
  { icon: Code2,         color: '#2563eb' },
  { icon: Laptop,        color: '#7c3aed' },
  { icon: Brain,         color: '#059669' },
  { icon: Rocket,        color: '#4506d9ff' },
]

/* ── Hero component ───────────────────────────────────────────── */
export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [autoKey, setAutoKey] = useState(0)

  const orb1Ref    = useRef(null)
  const orb2Ref    = useRef(null)
  const patternRef = useRef(null)
  const floatRef   = useRef(null)
  const statsRef   = useRef(null)

  /* Parallax scroll — direct DOM for 60fps */
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (orb1Ref.current)    orb1Ref.current.style.transform    = `translateY(${y * 0.38}px)`
        if (orb2Ref.current)    orb2Ref.current.style.transform    = `translateY(${y * -0.22}px) translateX(${y * 0.06}px)`
        if (patternRef.current) patternRef.current.style.transform = `translateY(${y * 0.1}px)`
        if (floatRef.current)   floatRef.current.style.transform   = `translateY(${y * -0.28}px)`
        if (statsRef.current)   statsRef.current.style.transform   = `translateY(${y * -0.08}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [autoKey])

  const goTo = useCallback((i) => { setCurrent(i); setAutoKey((k) => k + 1) }, [])
  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  const slide = slides[current]

  return (
    <section className="relative min-h-screen flex flex-col bg-navy-950 overflow-hidden">

      {/* ── Full-bleed image slider — slides right to left ──── */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateX(${(i - current) * 100}%)`,
              transition: 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
            }}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" draggable={false} />
          </div>
        ))}

        {/* Persistent overlays — not part of the slide */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-950/65 to-navy-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/40" />
      </div>

      {/* ── Parallax orbs ──────────────────────────────────────── */}
      <div
        ref={orb1Ref}
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 will-change-transform pointer-events-none"
        style={{ background: `radial-gradient(circle, ${slide.orb1}40, transparent 70%)` }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 will-change-transform pointer-events-none"
        style={{ background: `radial-gradient(circle, ${slide.orb2}30, transparent 70%)` }}
      />

      {/* Dot-grid pattern */}
      <div ref={patternRef} className="absolute inset-0 section-dots opacity-25 will-change-transform pointer-events-none" />

   

      {/* ── Text content — overlaid left-aligned ───────────────── */}
      <div className="relative flex-1 flex items-center pt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 lg:py-24">

          {/* key forces CSS animations to retrigger on slide change */}
          <div key={`content-${current}`} className="max-w-2xl">

            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-white text-sm font-medium mb-7 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Empowering the Next Generation
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-white leading-[1.06] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              {slide.headline.map((line, i) => (
                <span
                  key={i}
                  className={`block animate-slide-up ${i === slide.gradientLine ? 'gradient-text' : ''}`}
                  style={{ animationDelay: `${i * 120 + 100}ms` }}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Sub text */}
            <p className="mt-6 text-white/72 text-base sm:text-lg leading-relaxed max-w-lg animate-slide-up delay-300">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-9 animate-slide-up delay-400">
              <Link
                to={slide.cta1.to}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-800 to-blue-700 text-white text-sm font-bold rounded-md shadow-lg shadow-blue-600/35 hover:shadow-blue-600/55 hover:scale-[1.04] transition-all"
              >
                {slide.cta1.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={slide.cta2.to}
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white text-sm font-bold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all"
              >
                {slide.cta2.label}
              </Link>
            </div>

            {/* Social proof avatars */}
            <div className="flex items-center gap-4 mt-10 animate-slide-up delay-500">
              <div className="flex -space-x-2.5">
                {avatars.map(({ icon: Icon, color }, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-navy-950 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">2,500+ girls enrolled</p>
                <p className="text-xs text-white/45">transforming their futures with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>

  {/* ── Bottom: stats bar + slide controls ─────────────────── */}
<div ref={statsRef} className="relative z-10 border-t border-white/10 will-change-transform">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Stats Grid - 2x2 on mobile, 1x4 on desktop */}
    <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-stretch">
      
      {[
        { val: '2,500+', label: 'Girls Impacted' },
        { val: '12',     label: 'Programs' },
        { val: '50+',   label: 'Mentors' },
        { val: '8',      label: 'Communities' },
      ].map(({ val, label }, i) => (
        <div
          key={label}
          className={`
            flex items-center gap-3.5 px-5 py-5 flex-1
            /* Mobile borders */
            ${i === 0 ? 'border-r border-b border-white/10' : ''}
            ${i === 1 ? 'border-b border-white/10' : ''}
            ${i === 2 ? 'border-r border-white/10' : ''}
            ${i === 3 ? '' : ''}
            /* Desktop borders (overrides on sm+) */
            sm:border-b-0
            ${i < 3 ? 'sm:border-r' : ''}
            sm:border-white/10
          `}
        >
          <div>
            <p className="text-xl font-display font-black text-white">{val}</p>
            <p className="text-xs text-white/40">{label}</p>
          </div>
        </div>
      ))}
      
    </div>

    {/* Controls - Centered at bottom on mobile */}
    <div className="flex justify-center items-center py-5 sm:py-0">
      <div className="flex items-center gap-4 px-5 sm:px-0 sm:py-4 sm:border-l sm:border-t-0 border-white/10 flex-shrink-0">
        
        {/* Scroll indicator (dots) */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current 
                  ? 'w-7 h-2.5 bg-blue-500' 
                  : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        {/* Nav buttons */}
        <div className="flex gap-2 ml-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors"
            aria-label="Next slide"
          >
            <ArrowR className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

  </div>
</div>
    </section>
  )
}
