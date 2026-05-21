import { useState, useEffect, useCallback } from 'react'
import { Clock, MapPin, Users, ArrowRight, Bell, X, Send } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import ContactSection from '@components/sections/ContactSection'
import Toast from '@components/ui/Toast'
import { useReveal } from '@hooks/useReveal'
import { events } from '@data/events'

const catColor = {
  Gala: 'blue', Program: 'navy', Panel: 'blue', Hackathon: 'amber',
  Networking: 'green', Workshop: 'gray', Awards: 'blue',
}

const highlights = [
  { val: '7',    label: 'Events this season' },
  { val: '500+', label: 'Expected attendees' },
  { val: '₵0',   label: 'Most events are free' },
  { val: '3',    label: 'Featured flagship events' },
]

function RegisterModal({ event, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const d = new Date(event.date)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
    onSuccess(`Registered for "${event.title}"! Check your email for confirmation details.`)
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/65 flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-navy-950 p-7 relative overflow-hidden">
          <div className="absolute inset-0 section-dots opacity-20" />
          <div className="absolute right-0 top-0 w-40 h-40 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="relative">
            <Badge variant="blue">{event.category}</Badge>
            <h3 className="font-display font-bold text-white text-lg mt-3 leading-snug">{event.title}</h3>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><Clock  className="w-3.5 h-3.5" />{event.time} · {d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
            </div>
            <p className="text-xs font-bold text-blue-400 mt-2">{event.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-7 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Phone Number <span className="font-normal text-gray-400">(optional)</span></label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+233 20 000 0000"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Send className="w-4 h-4" /> Confirm Registration
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Events() {
  const featured    = events.filter((e) => e.featured)
  const revealRef   = useReveal()
  const [regEvent,  setRegEvent]  = useState(null)
  const [notifEmail, setNotifEmail] = useState('')
  const [toast,     setToast]     = useState({ show: false, message: '' })

  const hideToast  = useCallback(() => setToast((t) => ({ ...t, show: false })), [])
  const openReg    = useCallback((ev) => setRegEvent(ev), [])
  const closeReg   = useCallback(() => setRegEvent(null), [])
  const onSuccess  = useCallback((msg) => setToast({ show: true, message: msg }), [])

  const handleNotify = (e) => {
    e.preventDefault()
    setNotifEmail('')
    setToast({ show: true, message: "You're on the list! We'll notify you before each event." })
  }

  return (
    <>
      {regEvent && <RegisterModal event={regEvent} onClose={closeReg} onSuccess={onSuccess} />}
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      <PageHero
        eyebrow="Events"
        title="Where Community Comes Alive"
        subtitle="Workshops, galas, hackathons, and networking events — connect with mentors, peers, and industry leaders."
      />

      {/* ── Highlights bar ─────────────────────────────── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {highlights.map(({ val, label }) => (
              <div key={label}>
                <p className="font-display font-black text-4xl text-navy-950">{val}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured events ─────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white">
        <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionHeading eyebrow="Featured" title="Don't Miss These" className="mb-10" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((ev, i) => {
              const d = new Date(ev.date)
              return (
                <div key={ev.id} data-reveal data-reveal-delay={i * 100}
                  className="group bg-navy-950 rounded-3xl p-7 relative overflow-hidden hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute inset-0 section-dots opacity-20" />
                  <div className="absolute right-0 top-0 w-40 h-40 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <Badge variant="blue">{ev.category}</Badge>
                      <span className="text-xs text-white/40">{ev.price}</span>
                    </div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex flex-col items-center justify-center text-white mb-5">
                      <span className="text-[10px] font-bold text-blue-400 uppercase">{d.toLocaleString('en', { month: 'short' })}</span>
                      <span className="text-2xl font-display font-black leading-none">{d.getDate()}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg leading-snug">{ev.title}</h3>
                    <p className="text-white/55 text-sm mt-2 leading-relaxed line-clamp-2">{ev.description}</p>
                    <div className="mt-5 space-y-1.5 text-xs text-white/40">
                      <p className="flex items-center gap-1.5"><Clock  className="w-3.5 h-3.5" />{ev.time} · {d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{ev.location}</p>
                      <p className="flex items-center gap-1.5"><Users  className="w-3.5 h-3.5" />{ev.spots} spots available</p>
                    </div>
                    <button
                      onClick={() => openReg(ev)}
                      className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      Register Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Full calendar + sticky image ────────────────── */}
      <section className="py-10 pb-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">

            {/* Left: calendar list */}
            <div>
              <SectionHeading eyebrow="All Upcoming" title="Full Calendar" className="mb-10" />
              <div className="space-y-4">
                {events.map((ev) => {
                  const d = new Date(ev.date)
                  return (
                    <div key={ev.id}
                      className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="w-16 h-16 flex-shrink-0 bg-navy-950 rounded-xl flex flex-col items-center justify-center text-white">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">{d.toLocaleString('en', { month: 'short' })}</span>
                        <span className="text-2xl font-display font-black leading-none">{d.getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-1">
                          <Badge variant={catColor[ev.category] || 'gray'}>{ev.category}</Badge>
                          {ev.featured && <Badge variant="blue">Featured</Badge>}
                        </div>
                        <h3 className="font-bold text-navy-950 group-hover:text-blue-700 transition-colors">{ev.title}</h3>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Clock  className="w-3 h-3" />{ev.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-xs font-bold text-blue-700 mb-2">{ev.price}</p>
                        <button
                          onClick={() => openReg(ev)}
                          className="px-4 py-2 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold rounded-xl transition-colors"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: sticky panel */}
            <div className="hidden lg:block sticky top-24 space-y-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-navy-950/15 relative">
                <img src="/images/girlytech.webp" alt="GirlyTech community events"
                  className="w-full h-72 object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-display font-bold text-lg leading-snug">Join the Community That Shows Up for Each Other</p>
                  <p className="text-white/60 text-sm mt-1">Every event is a chance to connect, grow, and find your people.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950 text-sm">Never Miss an Event</p>
                    <p className="text-xs text-gray-400">Get notified before each event</p>
                  </div>
                </div>
                <form onSubmit={handleNotify} className="flex gap-2">
                  <input type="email" required value={notifEmail} onChange={(e) => setNotifEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                  <button type="submit"
                    className="px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors flex-shrink-0">
                    Notify Me
                  </button>
                </form>
              </div>

              <div className="bg-navy-950 rounded-2xl p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">This Season</p>
                <div className="space-y-3">
                  {[
                    { label: 'Free events',     val: '5' },
                    { label: 'Spots remaining', val: '780+' },
                    { label: 'Cities covered',  val: '3' },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-white/55">{label}</span>
                      <span className="font-display font-black text-lg text-white">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
