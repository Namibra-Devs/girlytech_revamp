import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Camera, Image } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import CallToAction from '@components/sections/CallToAction'
import { galleryItems } from '@data/gallery'

const categories = ['All', 'Programs', 'Events', 'Outreach']

const stats = [
  { val: '50+',  label: 'Events documented' },
  { val: '200+', label: 'Photos in our archive' },
  { val: '5',    label: 'Years of memories' },
  { val: '8',    label: 'Communities reached' },
]

export default function Gallery() {
  const [active,    setActive]    = useState('All')
  const [lightbox,  setLightbox]  = useState(null) // index into filtered array

  const filtered = active === 'All' ? galleryItems : galleryItems.filter((g) => g.category === active)

  const openAt  = useCallback((i) => setLightbox(i), [])
  const close   = useCallback(() => setLightbox(null), [])
  const prev    = useCallback(() => setLightbox((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next    = useCallback(() => setLightbox((i) => (i + 1) % filtered.length), [filtered.length])

  /* keyboard nav */
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next, close])

  /* lock scroll when lightbox open */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const current = lightbox !== null ? filtered[lightbox] : null

  return (
    <>
      {/* ── Lightbox overlay ───────────────────────────── */}
      {current && (
        <div
          className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover max-h-[75vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-bold text-lg">{current.title}</p>
              <p className="text-white/55 text-sm mt-1">{current.category} · {current.year}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-full text-white/70 text-xs font-semibold">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}

      <PageHero
        eyebrow="Gallery"
        title="Moments That Matter"
        subtitle="A visual journey through our programs, events, and community — every photo tells a story of impact."
      />

      {/* ── Archive stats — premium feature ───────────── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map(({ val, label }) => (
              <div key={label}>
                <p className="font-display font-black text-4xl text-navy-950">{val}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo grid ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setLightbox(null) }}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active === cat
                    ? 'bg-navy-950 text-white shadow-lg shadow-navy-950/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-400 flex items-center gap-1.5">
              <Image className="w-4 h-4" /> {filtered.length} photos · click to zoom
            </span>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                onClick={() => openAt(i)}
                className={`group relative rounded-2xl overflow-hidden cursor-zoom-in ${
                  i % 7 === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                style={{ minHeight: i % 7 === 0 ? '340px' : '180px' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <Camera className="w-5 h-5 text-navy-950" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-bold leading-tight">{item.title}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{item.category} · {item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Submit your story — second premium feature ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-5 border border-blue-100">
            Community Spotlight
          </span>
          <h2 className="font-display font-bold text-navy-950 text-3xl sm:text-4xl leading-tight">
            Your Story Belongs Here Too
          </h2>
          <p className="text-gray-500 text-base mt-4 leading-relaxed max-w-xl mx-auto">
            Are you a GirlyTech alumna, partner, or community member? Share your photos and your story — we feature community submissions in our gallery every month.
          </p>
          <a
            href="mailto:hello@girlytech.org?subject=Gallery Submission"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-navy-950 hover:bg-navy-900 text-white text-sm font-bold rounded-xl transition-all hover:scale-[1.03] shadow-lg shadow-navy-950/20"
          >
            Submit Your Photos
          </a>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
