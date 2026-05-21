import { useState, useCallback } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Zap, Users, Heart } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Toast from '@components/ui/Toast'

const info = [
  { icon: Mail,  label: 'Email Us',     value: 'hello@girlytech.org',  sub: 'We reply within 24 hours' },
  { icon: Phone, label: 'Call Us',      value: '+233 20 123 4567',      sub: 'Mon–Fri, 8am–5pm GMT' },
  { icon: MapPin,label: 'Visit Us',     value: '123 Cantonments Road',  sub: 'Accra, Ghana' },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Fri 8am–5pm',      sub: 'Weekends by appointment' },
]

const quickLinks = [
  { icon: Zap,           label: 'Program Enquiry',    sub: 'Questions about our bootcamps & courses' },
  { icon: Users,         label: 'Volunteer & Partner', sub: 'Join us or create an impact at scale' },
  { icon: Heart,         label: 'Donate',              sub: 'Fund scholarships and programs' },
  { icon: MessageSquare, label: 'General Enquiry',     sub: 'Anything else on your mind' },
]

export default function Contact() {
  const [form,  setForm]  = useState({ name: '', email: '', subject: '', message: '' })
  const [toast, setToast] = useState({ show: false, message: '' })

  const hideToast = useCallback(() => setToast((t) => ({ ...t, show: false })), [])

  const handle = (e) => {
    e.preventDefault()
    setForm({ name: '', email: '', subject: '', message: '' })
    setToast({ show: true, message: "Message sent! We'll get back to you within 24 hours." })
  }

  return (
    <>
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      <PageHero
        eyebrow="Contact Us"
        title="We'd Love to Hear From You"
        subtitle="Have a question, idea, or want to partner with us? Reach out — our team is always happy to connect."
      />

      {/* ── Quick topic links ──────────────────────────── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map(({ icon: Icon, label, sub }) => (
              <button
                key={label}
                onClick={() => setForm((f) => ({ ...f, subject: label }))}
                className="group text-left p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-navy-950 hover:border-transparent transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-700/25 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5 text-blue-700 group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="font-bold text-navy-950 group-hover:text-white text-sm transition-colors">{label}</p>
                <p className="text-xs text-gray-400 group-hover:text-white/50 mt-0.5 leading-snug transition-colors">{sub}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main contact section ───────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left: info */}
            <div className="lg:col-span-2 space-y-8">
              <SectionHeading eyebrow="Get In Touch" title="Let's Connect" />
              <p className="text-gray-500 leading-relaxed">
                Whether you are a girl ready to start her STEM journey, an organization wanting to partner, or a professional looking to volunteer — we want to hear from you.
              </p>

              <div className="space-y-4">
                {info.map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="group flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-navy-950 hover:border-transparent transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-700/25 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-5 h-5 text-blue-700 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 group-hover:text-white/40 uppercase tracking-wider transition-colors">{label}</p>
                      <p className="text-sm font-semibold text-navy-950 group-hover:text-white mt-0.5 transition-colors">{value}</p>
                      <p className="text-xs text-gray-400 group-hover:text-white/40 transition-colors">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="h-52 bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 section-dots opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 to-transparent" />
                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-700/25 border border-blue-700/30 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-7 h-7 text-blue-400" />
                  </div>
                  <p className="text-white font-bold text-sm">Accra, Ghana</p>
                  <p className="text-white/40 text-xs mt-1">123 Cantonments Road</p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <form onSubmit={handle} className="bg-gray-50 rounded-3xl p-8 lg:p-10 space-y-5 border border-gray-100">
                <div>
                  <h3 className="font-display font-bold text-navy-950 text-2xl">Send a Message</h3>
                  <p className="text-gray-400 text-sm mt-1">We read every message and respond within one business day.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Topic</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option>Program Enquiry</option>
                    <option>Volunteer</option>
                    <option>Partnership</option>
                    <option>Donation</option>
                    <option>Media / Press</option>
                    <option>General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-700/30 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>

                <p className="text-center text-xs text-gray-400">
                  By submitting this form you agree to our Privacy Policy. We never share your details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
