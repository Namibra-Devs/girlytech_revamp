import { Clock, MapPin, Users, ArrowRight, Calendar } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import Newsletter from '@components/sections/Newsletter'
import { events } from '@data/events'

const catColor = { Gala: 'pink', Program: 'navy', Panel: 'blue', Hackathon: 'amber', Networking: 'green', Workshop: 'gray', Awards: 'pink' }

export default function Events() {
  const featured = events.filter((e) => e.featured)
  const regular  = events.filter((e) => !e.featured)

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Where Community Comes Alive"
        subtitle="Workshops, galas, hackathons, and networking events — connect with mentors, peers, and industry leaders."
      />

      {/* Featured events */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Featured" title="Don't Miss These" className="mb-10" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((ev) => {
              const d = new Date(ev.date)
              return (
                <div key={ev.id} className="group bg-navy-950 rounded-3xl p-7 relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute inset-0 section-dots opacity-20" />
                  <div className="absolute right-0 top-0 w-40 h-40 bg-pink-500/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <Badge variant="pink">{ev.category}</Badge>
                      <span className="text-xs text-white/40">{ev.price}</span>
                    </div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex flex-col items-center justify-center text-white mb-5">
                      <span className="text-[10px] font-bold text-pink-400 uppercase">{d.toLocaleString('en', { month: 'short' })}</span>
                      <span className="text-2xl font-display font-black leading-none">{d.getDate()}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg leading-snug">{ev.title}</h3>
                    <p className="text-white/55 text-sm mt-2 leading-relaxed line-clamp-2">{ev.description}</p>
                    <div className="mt-5 space-y-1.5 text-xs text-white/40">
                      <p className="flex items-center gap-1.5"><Clock  className="w-3.5 h-3.5" />{ev.time} &middot; {d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{ev.location}</p>
                      <p className="flex items-center gap-1.5"><Users  className="w-3.5 h-3.5" />{ev.spots} spots available</p>
                    </div>
                    <button className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold rounded-xl transition-colors">
                      Register Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* All events list */}
      <section className="py-10 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="All Upcoming" title="Full Calendar" className="mb-10" />
          <div className="space-y-4">
            {events.map((ev) => {
              const d = new Date(ev.date)
              return (
                <div key={ev.id} className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-16 h-16 flex-shrink-0 bg-navy-950 rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-[10px] font-bold text-pink-400 uppercase">{d.toLocaleString('en', { month: 'short' })}</span>
                    <span className="text-2xl font-display font-black leading-none">{d.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <Badge variant={catColor[ev.category] || 'gray'}>{ev.category}</Badge>
                      {ev.featured && <Badge variant="pink">Featured</Badge>}
                    </div>
                    <h3 className="font-bold text-navy-950 group-hover:text-pink-600 transition-colors">{ev.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock  className="w-3 h-3" />{ev.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs font-bold text-pink-600 mb-2">{ev.price}</p>
                    <button className="px-4 py-2 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold rounded-xl transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
