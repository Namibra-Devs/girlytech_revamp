import { useState, useCallback } from 'react'
import { Star, Zap, Crown, Send, Users, BookOpen, Heart, Award } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Toast from '@components/ui/Toast'

const tiers = [
  {
    icon: Star,
    name: 'Explorer',
    price: 'Free',
    period: '',
    desc: 'Perfect for girls just starting their STEM journey.',
    perks: [
      'Access to free resources & guides',
      'Community forum membership',
      'Monthly newsletter',
      'Discounted event tickets',
    ],
  },
  {
    icon: Zap,
    name: 'Builder',
    price: '₵150',
    period: '/month',
    desc: 'For girls serious about building real skills fast.',
    popular: true,
    perks: [
      'Everything in Explorer',
      'Priority program enrollment',
      'Monthly 1-on-1 mentorship session',
      'Career resources & CV review',
      'Members-only events',
      'GirlyTech Builder certificate',
    ],
  },
  {
    icon: Crown,
    name: 'Leader',
    price: '₵350',
    period: '/month',
    desc: 'For women ready to lead and make impact.',
    perks: [
      'Everything in Builder',
      'Weekly group coaching sessions',
      'Scholarship application support',
      'Internship & job referrals',
      'Annual gala ticket (1 included)',
      'GirlyTech Ambassador recognition',
    ],
  },
]

const impacts = [
  { icon: BookOpen, value: '₵150',   label: 'funds one girl\'s bootcamp materials for a full cohort' },
  { icon: Users,    value: '₵350',   label: 'sponsors a scholarship seat for a girl from an underserved community' },
  { icon: Heart,    value: '₵1,500', label: 'funds an entire community workshop reaching 30+ girls' },
  { icon: Award,    value: '₵5,000', label: 'sponsors a full annual scholarship including mentorship support' },
]

const communityPerks = [
  { title: 'Private Slack Community', desc: 'Get direct access to our 2,500+ member network of girls, mentors, and industry professionals in tech across Ghana.' },
  { title: 'Monthly Resource Drop', desc: 'Curated learning materials, career guides, job boards, and scholarship opportunities delivered to your inbox every month.' },
  { title: 'Member Showcases', desc: 'Feature your projects in our member portfolio and get exposure to hiring partners and the broader GirlyTech community.' },
  { title: 'Priority Event Access', desc: 'Get early bird access and reserved seats at all GirlyTech events including hackathons, galas, and networking nights.' },
]

export default function Membership() {
  const [form, setForm] = useState({ name: '', email: '', tier: 'Builder' })
  const [toast, setToast] = useState({ show: false, message: '' })

  const hideToast = useCallback(() => setToast((t) => ({ ...t, show: false })), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setForm({ name: '', email: '', tier: 'Builder' })
    setToast({ show: true, message: 'Welcome to GirlyTech! Check your email for your welcome pack.' })
  }

  return (
    <>
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      <PageHero
        eyebrow="Membership"
        title="Become Part of the Movement"
        subtitle="Join a community of girls and women who are building the future together. Your membership directly funds programs for underserved girls."
      />

      {/* ── Tiers ──────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Plans" title="Choose Your Level" center className="mb-14" />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
            {tiers.map(({ icon: Icon, name, price, period, desc, popular, perks }) => (
              <div
                key={name}
                className={`rounded-3xl p-8 relative overflow-hidden transition-all ${
                  popular
                    ? 'bg-blue-700 text-white ring-2 ring-blue-500 shadow-xl shadow-blue-600/30'
                    : 'bg-gray-50 hover:shadow-lg'
                }`}
              >
                {popular && (
                  <span className="absolute top-5 right-5 px-3 py-1 bg-white text-blue-700 text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${popular ? 'bg-white/20' : 'bg-blue-50'}`}>
                  <Icon className={`w-6 h-6 ${popular ? 'text-white' : 'text-blue-700'}`} />
                </div>
                <h3 className={`font-display font-bold text-2xl ${popular ? 'text-white' : 'text-navy-950'}`}>{name}</h3>
                <p className={`mt-1 text-sm ${popular ? 'text-white/70' : 'text-gray-500'}`}>{desc}</p>
                <div className="my-5">
                  <span className={`text-4xl font-display font-black ${popular ? 'text-white' : 'text-navy-950'}`}>{price}</span>
                  <span className={`text-sm ${popular ? 'text-white/60' : 'text-gray-400'}`}>{period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {perks.map((perk) => (
                    <li key={perk} className={`flex items-start gap-2.5 text-sm ${popular ? 'text-white/80' : 'text-gray-600'}`}>
                      <span className={`font-bold flex-shrink-0 mt-0.5 ${popular ? 'text-white' : 'text-blue-600'}`}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setForm((f) => ({ ...f, tier: name }))}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    popular
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-navy-950 text-white hover:bg-navy-900'
                  }`}
                >
                  {price === 'Free' ? 'Join Free' : `Start ${name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Your Membership Funds — premium dark section */}
      <section className="py-20 lg:py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 section-dots opacity-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-700/12 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-blue-700/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-blue-700/30">
              Your Impact
            </span>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
              What Your Membership Funds
            </h2>
            <p className="text-white/50 text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Every tier directly translates to real opportunities for girls who need it most.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {impacts.map(({ icon: Icon, value, label }) => (
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

      {/* ── Community Perks — second premium feature ─── */}
      <section className="py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-700/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            eyebrow="Member Benefits"
            title="More Than a Membership"
            subtitle="When you join GirlyTech you get access to a thriving ecosystem built to accelerate your career in STEM."
            center
            className="mb-14"
          />

          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
            {communityPerks.map(({ title, desc }) => (
              <div key={title} className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex gap-5">
                <div className="w-2 flex-shrink-0 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 mt-1" style={{ minHeight: '2.5rem' }} />
                <div>
                  <h3 className="font-bold text-navy-950 group-hover:text-blue-700 transition-colors">{title}</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sign-up form ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Join Today" title="Create Your Account" center className="mb-10" />

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Membership Tier</label>
              <select
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white"
              >
                {tiers.map((t) => <option key={t.name}>{t.name} — {t.price}{t.period}</option>)}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" /> Create Membership
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
