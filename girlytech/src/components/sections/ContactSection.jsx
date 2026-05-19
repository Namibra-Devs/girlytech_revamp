import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useReveal } from '@hooks/useReveal'

const contactInfo = [
  { icon: Mail,   label: 'hello@girlytech.org' },
  { icon: Phone,  label: '+264 81 123 4567' },
  { icon: MapPin, label: 'Windhoek, Namibia' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const revealRef  = useReveal()
  const imgRef     = useRef(null)
  const blobRef    = useRef(null)
  const panelRef   = useRef(null)   // image container — viewport-relative parallax origin
  const contentRef = useRef(null)   // overlay content — slower speed creates depth

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

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault() }

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div ref={blobRef} className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-3xl will-change-transform pointer-events-none translate-x-1/3" />
      <div className="absolute -bottom-20 left-0 w-80 h-80 bg-navy-950/4 rounded-full blur-3xl pointer-events-none" />

      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 lg:items-stretch">

          {/* LEFT: Form */}
          <div data-reveal data-reveal-from="left">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Get In Touch
            </span>
            <h2 className="font-display font-bold text-navy-950 text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Let's Start a Conversation
            </h2>
            <p className="text-gray-500 text-base mt-4 leading-relaxed">
              Have questions about our programs, partnerships, or volunteering? We'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-950 mb-1.5">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-950 mb-1.5">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-950 mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold text-sm rounded-md cursor-pointer shadow-lg shadow-blue-700/25 hover:shadow-blue-700/40 hover:scale-[1.02] transition-all"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* RIGHT: Image with contact overlay */}
          <div
            ref={panelRef}
            data-reveal
            data-reveal-from="right"
            data-reveal-delay="150"
            className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-0 w-full rounded-xl overflow-hidden shadow-2xl shadow-navy-950/15"
          >
            <img
              ref={imgRef}
              src="/images/member.webp"
              alt="Get in touch with GirlyTech"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{ transform: 'scale(1.15)' }}
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-transparent" />

            {/* Contact details pinned to bottom */}
            <div ref={contentRef} className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 will-change-transform">
              <h3 className="font-display font-bold text-white text-xl mb-6">Reach Us Directly</h3>
              <div className="space-y-3.5">
                {contactInfo.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-white/75 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-blue-700/30 border border-blue-700/25 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-300" />
                    </div>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
