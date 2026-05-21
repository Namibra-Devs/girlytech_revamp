import { useEffect, useRef } from 'react'
import { ArrowRight, Clock, Users, Monitor, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { programs } from '@data/programs'
import { useReveal } from '@hooks/useReveal'

const tagVariant = (tag) => {
  if (tag === 'Free' || tag === 'Scholarship') return 'green'
  if (tag === 'Advanced') return 'navy'
  return 'gray'
}

export default function FeaturedPrograms() {
  const revealRef = useReveal()
  const blobRef   = useRef(null)

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (blobRef.current) blobRef.current.style.transform = `translateY(${window.scrollY * 0.05}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      <div ref={blobRef} className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-96 bg-blue-700/5 rounded-full blur-3xl will-change-transform pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="What We Offer"
            title="Programs Built for Her"
            subtitle="From beginner bootcamps to advanced masterclasses — every program is designed with girls in mind."
          />
          <Button to="/programs" variant="outline-dark" size="md" iconRight={<ArrowRight className="w-4 h-4" />} className="flex-shrink-0">
            All Programs
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {programs.slice(0, 3).map((prog, i) => (
            <article
              key={prog.id}
              data-reveal
              data-reveal-delay={i * 130}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image header */}
              <div className="h-52 relative overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold rounded-full">
                    {prog.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white text-xs font-medium">{prog.spotsLeft} spots left</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {prog.tags.map((tag) => <Badge key={tag} variant={tagVariant(tag)}>{tag}</Badge>)}
                </div>
                <h3 className="font-display font-bold text-navy-950 text-lg leading-snug group-hover:text-blue-700 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{prog.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5"><Clock    className="w-3.5 h-3.5 text-blue-700" />{prog.duration}</span>
                  <span className="flex items-center gap-1.5"><Users    className="w-3.5 h-3.5 text-blue-700" />Age {prog.ageGroup}</span>
                  <span className="flex items-center gap-1.5"><Monitor  className="w-3.5 h-3.5 text-blue-700" />{prog.mode}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-700" />{prog.spotsLeft} spots</span>
                </div>

                <Link
                  to="/programs"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 border-2 border-navy-950 text-navy-950 text-sm font-bold rounded-xl hover:bg-navy-950 hover:text-white transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
