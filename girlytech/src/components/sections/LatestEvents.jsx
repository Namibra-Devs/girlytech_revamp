import { Clock, MapPin, ArrowRight, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { events } from '@data/events'

const catColor = { Gala: 'pink', Program: 'navy', Panel: 'blue', Hackathon: 'amber', Networking: 'green', Workshop: 'gray', Awards: 'pink' }

function fmtDate(s) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function LatestEvents() {
  const upcoming = events.slice(0, 3)

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="What's Coming"
            title="Upcoming Events"
            subtitle="Workshops, panels, hackathons, and more — join us and be part of something bigger."
          />
          <Button to="/events" variant="outline-dark" size="md" iconRight={<ArrowRight className="w-4 h-4" />} className="flex-shrink-0">
            All Events
          </Button>
        </div>

        <div className="space-y-4">
          {upcoming.map((ev) => {
            const d = new Date(ev.date)
            return (
              <div
                key={ev.id}
                className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-5 lg:gap-7"
              >
                {/* Date block */}
                <div className="w-20 h-20 flex-shrink-0 bg-navy-950 rounded-2xl flex flex-col items-center justify-center text-white">
                  <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                    {d.toLocaleString('en', { month: 'short' })}
                  </span>
                  <span className="text-3xl font-display font-black leading-none">{d.getDate()}</span>
                  <span className="text-[10px] text-white/40">{d.getFullYear()}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <Badge variant={catColor[ev.category] || 'gray'}>{ev.category}</Badge>
                    {ev.featured && <Badge variant="pink">Featured</Badge>}
                  </div>
                  <h3 className="font-bold text-navy-950 group-hover:text-pink-600 transition-colors">{ev.title}</h3>
                  <p className="text-gray-400 text-sm mt-0.5 line-clamp-1">{ev.description}</p>
                  <div className="flex flex-wrap gap-4 mt-2.5 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock  className="w-3.5 h-3.5" />{ev.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{ev.location}</span>
                    <span className="flex items-center gap-1"><Users  className="w-3.5 h-3.5" />{ev.spots} spots</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-pink-600">{ev.price}</span>
                  <Link
                    to="/events"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-navy-950 hover:bg-navy-900 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    Register <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
