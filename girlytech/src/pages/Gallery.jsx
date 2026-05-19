import { useState } from 'react'
import { Camera, Grid, ZoomIn } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Newsletter from '@components/sections/Newsletter'
import { galleryItems } from '@data/gallery'

const categories = ['All', 'Programs', 'Events', 'Outreach']

export default function Gallery() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? galleryItems : galleryItems.filter((g) => g.category === active)

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments That Matter"
        subtitle="A visual journey through our programs, events, and community — every photo tells a story of impact."
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active === cat
                    ? 'bg-navy-950 text-white shadow-lg shadow-navy-950/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-400">{filtered.length} items</span>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  i % 7 === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                style={{ aspectRatio: i % 7 === 0 ? 'auto' : '1/1', minHeight: i % 7 === 0 ? '340px' : '180px' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                <div className="absolute inset-0 section-dots opacity-25" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-bold leading-tight">{item.title}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{item.category} · {item.year}</p>
                </div>
                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
                  <Camera className="w-10 h-10 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
