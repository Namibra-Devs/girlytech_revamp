import { useState, useEffect, useRef, useCallback } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { testimonials } from '@data/testimonials'
import { useReveal } from '@hooks/useReveal'

const count = testimonials.length
// [clone_of_last, real_0, real_1, ..., real_N-1, clone_of_first]
const track = [
  { ...testimonials[count - 1], id: 'clone-last' },
  ...testimonials,
  { ...testimonials[0], id: 'clone-first' },
]
const GAP = 32

export default function Testimonials() {
  const [pos,     setPos]     = useState(1)   // track index; 1 = first real card
  const [smooth,  setSmooth]  = useState(true)
  const [autoKey, setAutoKey] = useState(0)
  const [cardW,   setCardW]   = useState(520)
  const stepPx    = cardW + GAP
  const revealRef = useReveal()
  const blob1Ref  = useRef(null)
  const blob2Ref  = useRef(null)
  const stageRef  = useRef(null)

  /* Responsive card width */
  useEffect(() => {
    if (!stageRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width
      setCardW(Math.min(520, Math.round(cw * 0.82)))
    })
    ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [])

  /* Forward wrap: landed on clone-first → snap silently to real first */
  useEffect(() => {
    if (pos !== count + 1) return
    const t = setTimeout(() => { setSmooth(false); setPos(1) }, 870)
    return () => clearTimeout(t)
  }, [pos])

  /* Backward wrap: landed on clone-last → snap silently to real last */
  useEffect(() => {
    if (pos !== 0) return
    const t = setTimeout(() => { setSmooth(false); setPos(count) }, 870)
    return () => clearTimeout(t)
  }, [pos])

  /* Re-enable transition after silent snap (double RAF ensures layout flush) */
  useEffect(() => {
    if (smooth) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setSmooth(true)))
    return () => cancelAnimationFrame(id)
  }, [smooth])

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(() => setPos((p) => p + 1), 4500)
    return () => clearInterval(t)
  }, [autoKey])

  const prev = useCallback(() => {
    setSmooth(true); setPos((p) => p - 1); setAutoKey((k) => k + 1)
  }, [])

  const next = useCallback(() => {
    setSmooth(true); setPos((p) => p + 1); setAutoKey((k) => k + 1)
  }, [])

  const goTo = useCallback((realIdx) => {
    setSmooth(true); setPos(realIdx + 1); setAutoKey((k) => k + 1)
  }, [])

  // active dot: works for clones at pos=0 and pos=count+1
  const activeDot = ((pos - 1) + count) % count

  /* Parallax blobs */
  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${y * -0.05}px)`
        if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${y * 0.04}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div ref={blob1Ref} className="absolute -top-32 right-0 w-[480px] h-[480px] bg-blue-700/5 rounded-full blur-3xl translate-x-1/4 will-change-transform pointer-events-none" />
      <div ref={blob2Ref} className="absolute -bottom-20 left-0 w-80 h-80 bg-navy-950/4 rounded-full blur-3xl -translate-x-1/4 will-change-transform pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal>
          <SectionHeading
            eyebrow="Success Stories"
            title="Girls Who Dared, Girls Who Did"
            subtitle="Real stories from real young women who transformed their futures through GirlyTech."
            center
            className="mb-16"
          />
        </div>
      </div>

      {/* Slider stage — full-width for correct ResizeObserver measurements */}
      <div ref={stageRef} className="relative">
        <div className="overflow-hidden">
          <div
            className="flex py-8 will-change-transform"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(calc(50% - ${cardW / 2}px - ${pos * stepPx}px))`,
              transition: smooth ? 'transform 0.87s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
            }}
          >
            {track.map((t, i) => {
              const diff     = i - pos
              const isCenter = diff === 0
              const isSide   = Math.abs(diff) === 1
              return (
                <div
                  key={t.id}
                  style={{
                    width:         `${cardW}px`,
                    flexShrink:    0,
                    opacity:       isCenter ? 1 : isSide ? 0.38 : 0,
                    filter:        isCenter ? 'none' : 'blur(3px)',
                    transform:     `scale(${isCenter ? 1 : 0.92})`,
                    transition:    'opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease',
                    pointerEvents: isCenter ? 'auto' : 'none',
                  }}
                >
                  <blockquote className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm h-full flex flex-col">
                    <Quote className="w-9 h-9 text-blue-700 mb-5 flex-shrink-0" />
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-8 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-md ring-2 ring-white">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <cite className="not-italic font-bold text-sm text-navy-950 block">{t.name}</cite>
                        <span className="text-xs text-gray-400">{t.role}</span>
                        <div className="mt-1">
                          <span className="text-xs font-semibold text-blue-700">{t.program}</span>
                          <span className="text-gray-300 mx-1.5">·</span>
                          <span className="text-xs text-gray-400">{t.year}</span>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              )
            })}
          </div>
        </div>

        {/* Side gradient fades */}
        <div className="absolute inset-y-0 left-0 w-28 lg:w-52 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-28 lg:w-52 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-navy-950 hover:text-white text-navy-950 flex items-center justify-center transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeDot === i ? 'w-7 h-2.5 bg-blue-700' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-navy-950 hover:text-white text-navy-950 flex items-center justify-center transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
