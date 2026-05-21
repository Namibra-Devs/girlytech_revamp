import { useState, useCallback } from 'react'
import { Building2, Handshake, TrendingUp, Globe, Send, CheckCircle, BarChart3, Users, BookOpen, Star } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Toast from '@components/ui/Toast'

const partnerTypes = [
  {
    icon: Building2,
    title: 'Corporate Sponsor',
    desc: 'Fund scholarships, programs, and bootcamps. Get brand recognition, CSR impact reporting, and employee volunteering opportunities.',
    commitment: 'From ₵10,000/year',
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
    commitment: 'From ₵5,000/year',
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
  'MTN Ghana', 'KNUST', 'Ghana Tech Lab',
  'Ecobank Ghana', 'Bank of Ghana', 'Vodafone Ghana', 'iSpace Ghana', 'UN Women Ghana',
]

const impactStats = [
  { icon: Users,    value: '2,500+', label: 'Girls reached through partner-funded programs' },
  { icon: BookOpen, value: '12',     label: 'Programs co-designed with industry partners' },
  { icon: BarChart3,value: '₵1.2M', label: 'Total partner investment in girls\' STEM education' },
  { icon: Star,     value: '95%',    label: 'Partner satisfaction with program outcomes' },
]

export default function Partner() {
  const [form, setForm] = useState({ org: '', name: '', email: '', type: '', message: '' })
  const [toast, setToast] = useState({ show: false, message: '' })

  const hideToast = useCallback(() => setToast((t) => ({ ...t, show: false })), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setForm({ org: '', name: '', email: '', type: '', message: '' })
    setToast({ show: true, message: "Enquiry received! Our partnerships team will reach out within 48 hours." })
  }

  return (
    <>
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      <PageHero
        eyebrow="Partner With Us"
        title="Create Impact at Scale Together"
        subtitle="Join our growing network of organizations committed to gender equity in technology. Together, we reach further."
      />

      {/* ── Partnership types ──────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Partnership Models" title="How We Work Together" center className="mb-14" />

          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map(({ icon: Icon, title, desc, commitment, benefits }) => (
              <div key={title} className="group bg-gray-50 hover:bg-navy-950 rounded-3xl p-8 border border-gray-100 hover:border-transparent transition-all duration-300">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-6 h-6 text-blue-700 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 group-hover:text-white transition-colors">{title}</h3>
                    <p className="text-xs font-semibold text-blue-700 group-hover:text-blue-400 transition-colors mt-0.5">{commitment}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-white/65 leading-relaxed mb-5 transition-colors">{desc}</p>
                <ul className="space-y-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-white/55 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 group-hover:text-blue-400 flex-shrink-0 transition-colors" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership Impact — premium dark feature ─── */}
      <section className="py-20 lg:py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 section-dots opacity-20 pointer-events-none" />
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-blue-700/12 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-blue-700/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-blue-700/30">
              Partnership Impact
            </span>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Partners Who Are Already Changing Lives
            </h2>
            <p className="text-white/50 text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Our corporate and institutional partners have helped us reach thousands of girls and transform communities across Ghana.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {impactStats.map(({ icon: Icon, value, label }) => (
              <div key={value} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/8 hover:border-blue-700/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-700/25 border border-blue-700/30 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <p className="font-display font-black text-3xl text-white mb-2">{value}</p>
                <p className="text-sm text-white/45 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current partners ───────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Current Partners & Supporters</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {currentPartners.map((p) => (
              <span
                key={p}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-blue-300 hover:text-navy-950 transition-all cursor-default shadow-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner inquiry form ───────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Get Started" title="Start a Conversation" center className="mb-10" />

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Organization Name</label>
                <input
                  required
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Contact Person</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="contact@yourorg.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Partnership Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Select a type</option>
                {partnerTypes.map((t) => <option key={t.title}>{t.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your organization and what you have in mind..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" /> Send Partnership Enquiry
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
