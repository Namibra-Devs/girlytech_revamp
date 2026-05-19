import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'

const info = [
  { icon: Mail,  label: 'Email Us',    value: 'hello@girlytech.org',  sub: 'We reply within 24 hours' },
  { icon: Phone, label: 'Call Us',     value: '+264 81 123 4567',     sub: 'Mon–Fri, 8am–5pm WAT' },
  { icon: MapPin,label: 'Visit Us',    value: '123 Independence Ave', sub: 'Windhoek, Namibia' },
  { icon: Clock, label: 'Office Hours',value: 'Mon–Fri 8am–5pm',     sub: 'Weekends by appointment' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => { e.preventDefault(); setSent(true) }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd Love to Hear From You"
        subtitle="Have a question, idea, or want to partner with us? Reach out — our team is always happy to connect."
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact info */}
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Get In Touch" title="Let's Connect" className="mb-8" />
              <p className="text-gray-500 leading-relaxed mb-8">
                Whether you are a girl ready to start her STEM journey, an organization wanting to partner, or a professional looking to volunteer — we want to hear from you.
              </p>

              <div className="space-y-5">
                {info.map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-semibold text-navy-950 mt-0.5">{value}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 h-48 bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 section-dots opacity-20" />
                <div className="relative text-center">
                  <MapPin className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Windhoek, Namibia</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 rounded-3xl">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                    <MessageSquare className="w-9 h-9 text-emerald-600" />
                  </div>
                  <h3 className="font-display font-bold text-navy-950 text-2xl">Message Sent!</h3>
                  <p className="text-gray-500 mt-2">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-6 px-6 py-3 bg-navy-950 text-white text-sm font-bold rounded-xl hover:bg-navy-900 transition-colors">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handle} className="bg-gray-50 rounded-3xl p-8 space-y-5">
                  <h3 className="font-display font-bold text-navy-950 text-2xl mb-2">Send a Message</h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors"
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
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 focus:outline-none focus:border-pink-400 transition-colors"
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
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
