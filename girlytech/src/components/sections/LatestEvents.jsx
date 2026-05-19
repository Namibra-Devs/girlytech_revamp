import { useEffect, useRef } from 'react'
import { Clock, MapPin, ArrowRight, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { events } from '@data/events'
import { useReveal } from '@hooks/useReveal'

const catColor = { Gala: 'blue', Program: 'navy', Panel: 'blue', Hackathon: 'amber', Networking: 'green', Workshop: 'gray', Awards: 'blue' }
const featured  = events.find((e) => e.featured) || events[0]

export default function LatestEvents() {
  const revealRef    = useReveal()
  const imgRef       = useRef(null)
  const blobRef      = useRef(null)
  const panelRef     = useRef(null)   // image container — for viewport-relative parallax
  const contentRef   = useRef(null)   // overlay content — driven at slower speed for depth

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!panelRef.current) return
        const rect   = panelRef.current.getBoundingClientRect()
        const center = (rect.top + rect.height * 0.5) - window.innerHeight * 0.5
        // image: fast — appears deep behind the content
        if (imgRef.current)
          imgRef.current.style.transform = `scale(1.15) translateY(${center * 0.12}px)`
        // overlay content: slow — floats closer to the viewer
        if (contentRef.current)
          contentRef.current.style.transform = `translateY(${center * 0.04}px)`
        // background blob: counter-direction for extra depth
        if (blobRef.current)
          blobRef.current.style.transform = `translateY(${center * -0.08}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      <div ref={blobRef} className="absolute -top-20 left-0 w-72 h-72 bg-navy-950/4 rounded-full blur-3xl pointer-events-none will-change-transform" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 lg:items-stretch">

          {/* LEFT: heading + compact event list */}
          <div>
            <div data-reveal>
              <SectionHeading
                eyebrow="What's Coming"
                title="Upcoming Events"
                subtitle="Workshops, panels, hackathons, and more — join us and be part of something bigger."
                className="mb-10"
              />
            </div>

            <div className="space-y-3">
              {events.slice(0, 4).map((ev, i) => {
                const d = new Date(ev.date)
                return (
                  <div
                    key={ev.id}
                    data-reveal
                    data-reveal-delay={80 + i * 90}
                    className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="w-14 h-14 flex-shrink-0 bg-navy-950 rounded-xl flex flex-col items-center justify-center text-white">
                      <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                        {d.toLocaleString('en', { month: 'short' })}
                      </span>
                      <span className="text-2xl font-display font-black leading-none">{d.getDate()}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant={catColor[ev.category] || 'gray'}>{ev.category}</Badge>
                        {ev.featured && <Badge variant="blue">Featured</Badge>}
                      </div>
                      <h3 className="font-bold text-sm text-navy-950 group-hover:text-blue-700 transition-colors truncate">{ev.title}</h3>
                      <div className="flex gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ev.time}</span>
                        <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3 flex-shrink-0" />{ev.location}</span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-blue-700 flex-shrink-0">{ev.price}</span>
                  </div>
                )
              })}
            </div>

            <div data-reveal data-reveal-delay="480" className="mt-8">
              <Button to="/events" variant="outline-dark" size="md" iconRight={<ArrowRight className="w-4 h-4" />}>
                View All Events
              </Button>
            </div>
          </div>

          {/* RIGHT: large image with featured event overlay */}
          <div
            ref={panelRef}
            data-reveal
            data-reveal-from="right"
            data-reveal-delay="120"
            className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-0 w-full rounded-xl overflow-hidden shadow-2xl shadow-navy-950/20"
          >
            <img
              ref={imgRef}
              src="/images/girlytech.webp"
              alt="GirlyTech Events"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ transform: 'scale(1.15)' }}
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/30 to-transparent" />

            {/* Featured event info */}
            <div ref={contentRef} className="absolute bottom-0 left-0 right-0 p-7 lg:p-9 will-change-transform">
              <Badge variant="blue" className="mb-4">Featured Event</Badge>
              <h3 className="font-display font-bold text-white text-xl lg:text-2xl leading-snug">
                {featured.title}
              </h3>
              <p className="text-white/60 text-sm mt-2 leading-relaxed line-clamp-2">{featured.description}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/55">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(featured.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{featured.location}</span>
              </div>
              <Link
                to="/events"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-900 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-900/30"
              >
                Register Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
