import { useState } from 'react'
import { Heart, Clock, Users, Lightbulb, Code, Mic, BookOpen, Send } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import CallToAction from '@components/sections/CallToAction'

const roles = [
  { icon: Code,      title: 'Technical Mentor',      time: '2–4 hrs/week',  desc: 'Guide girls through coding, debugging, and building real projects. Share your engineering experience.' },
  { icon: Mic,       title: 'Guest Speaker',          time: 'Flexible',      desc: 'Share your career journey at workshops, webinars, or events. Inspire the next generation.' },
  { icon: BookOpen,  title: 'Curriculum Contributor', time: '4–6 hrs/month', desc: 'Help design and review program content to ensure it is relevant, current, and empowering.' },
  { icon: Users,     title: 'Community Facilitator',  time: '2 hrs/week',    desc: 'Moderate our online community, welcome new members, and organize peer-learning sessions.' },
  { icon: Lightbulb, title: 'Career Coach',           time: '1–2 hrs/week',  desc: 'Help girls refine CVs, prepare for interviews, and navigate their first tech job search.' },
  { icon: Heart,     title: 'Event Volunteer',        time: 'Per event',     desc: 'Support our events on the ground — set-up, coordination, registration, and hosting duties.' },
]

const reasons = [
  { val: '150+', label: 'Active volunteers making a difference' },
  { val: '2hrs',  label: 'Minimum weekly time commitment' },
  { val: '8+',    label: 'Ways to contribute your skills' },
  { val: '100%',  label: 'Flexible — remote or in-person' },
]

export default function Volunteer() {
  const [form, setForm] = useState({ name: '', email: '', role: '', bio: '' })
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Give Your Skills. Change Her Story."
        subtitle="Join 150+ professionals who dedicate their time and expertise to empowering the next generation of women in tech."
      />

      {/* Why volunteer stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-black text-4xl text-navy-950">{val}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How to Help" title="Volunteer Roles" center className="mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map(({ icon: Icon, title, time, desc }) => (
              <div key={title} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-pink-50 group-hover:bg-pink-600 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-navy-950">{title}</h3>
                <p className="text-xs font-semibold text-pink-600 mt-0.5 mb-2">{time}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Apply" title="Join as a Volunteer" center className="mb-10" />

          {sent ? (
            <div className="text-center py-16 bg-gray-50 rounded-3xl">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-9 h-9 text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-navy-950 text-2xl">Application Received!</h3>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">Thank you for offering your time. Our team will reach out within 3–5 business days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="bg-gray-50 rounded-3xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors">
                  <option value="">Select a role</option>
                  {roles.map((r) => <option key={r.title}>{r.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Brief Bio / Motivation</label>
                <textarea required rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us about yourself and why you want to volunteer..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Send className="w-4 h-4" /> Submit Application
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
