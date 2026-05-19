import { useState } from 'react'
import { Building2, Handshake, TrendingUp, Globe, Send, CheckCircle } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Newsletter from '@components/sections/Newsletter'

const partnerTypes = [
  {
    icon: Building2,
    title: 'Corporate Sponsor',
    desc: 'Fund scholarships, programs, and bootcamps. Get brand recognition, CSR impact reporting, and employee volunteering opportunities.',
    commitment: 'From N$10,000/year',
    benefits: ['Logo on website & materials', 'Named scholarship program', 'CSR impact report', 'Employee volunteer days', 'Gala table sponsorship'],
  },
  {
    icon: Handshake,
    title: 'Program Partner',
    desc: 'Co-design and co-deliver programs with our team. Bring your technical expertise to shape the next generation of developers.',
    commitment: 'Custom arrangement',
    benefits: ['Co-branded curriculum', 'Instructor access', 'Graduate recruitment pipeline', 'Joint press releases', 'Impact co-branding'],
  },
  {
    icon: TrendingUp,
    title: 'Hiring Partner',
    desc: 'Access our talent pipeline of trained, career-ready graduates. Post opportunities and connect directly with our community.',
    commitment: 'From N$5,000/year',
    benefits: ['Graduate CV database access', 'Campus recruitment events', 'Internship hosting', 'Job board listing', 'Cohort presentations'],
  },
  {
    icon: Globe,
    title: 'NGO / Academic Partner',
    desc: 'Collaborate on research, community outreach, and joint funding proposals to maximize our collective impact.',
    commitment: 'MOU-based',
    benefits: ['Joint research projects', 'Cross-referral of beneficiaries', 'Co-authored publications', 'Shared funding applications', 'Networking events'],
  },
]

const currentPartners = [
  'MTC Namibia', 'Namibia University of Science & Technology', 'TechNamibia',
  'FNB Namibia', 'Bank of Namibia', 'Telecom Namibia', 'iHub Namibia', 'UN Women Namibia',
]

export default function Partner() {
  const [form, setForm] = useState({ org: '', name: '', email: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        eyebrow="Partner With Us"
        title="Create Impact at Scale Together"
        subtitle="Join our growing network of organizations committed to gender equity in technology. Together, we reach further."
      />

      {/* Partnership types */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Partnership Models" title="How We Work Together" center className="mb-14" />

          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map(({ icon: Icon, title, desc, commitment, benefits }) => (
              <div key={title} className="group bg-gray-50 hover:bg-navy-950 rounded-3xl p-8 border border-gray-100 hover:border-transparent transition-all duration-300">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 group-hover:bg-pink-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-6 h-6 text-pink-600 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 group-hover:text-white transition-colors">{title}</h3>
                    <p className="text-xs font-semibold text-pink-600 group-hover:text-pink-400 transition-colors mt-0.5">{commitment}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white/65 leading-relaxed mb-5 transition-colors">{desc}</p>
                <ul className="space-y-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-white/55 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Current Partners & Supporters</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {currentPartners.map((p) => (
              <span key={p} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-pink-300 hover:text-navy-950 transition-all cursor-default shadow-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Partner inquiry form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Get Started" title="Start a Conversation" center className="mb-10" />

          {sent ? (
            <div className="text-center bg-gray-50 rounded-3xl p-12">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-9 h-9 text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-navy-950 text-2xl">Enquiry Received!</h3>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">Our partnerships team will reach out within 48 hours to schedule a discovery call.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="bg-gray-50 rounded-3xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Organization Name</label>
                  <input required value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Contact Person</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@yourorg.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Partnership Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors">
                  <option value="">Select a type</option>
                  {partnerTypes.map((t) => <option key={t.title}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Message</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your organization and what you have in mind..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Send className="w-4 h-4" /> Send Partnership Enquiry
              </button>
            </form>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
