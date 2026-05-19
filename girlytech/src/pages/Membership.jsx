import { useState } from 'react'
import { Star, Zap, Crown, Send } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Newsletter from '@components/sections/Newsletter'

const tiers = [
  {
    icon: Star,
    name: 'Explorer',
    price: 'Free',
    period: '',
    desc: 'Perfect for girls just starting their STEM journey.',
    color: 'gray',
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
    price: 'N$150',
    period: '/month',
    desc: 'For girls serious about building real skills fast.',
    color: 'pink',
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
    price: 'N$350',
    period: '/month',
    desc: 'For women ready to lead and make impact.',
    color: 'navy',
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

export default function Membership() {
  const [form, setForm] = useState({ name: '', email: '', tier: 'Builder' })
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Become Part of the Movement"
        subtitle="Join a community of girls and women who are building the future together. Your membership directly funds programs for underserved girls."
      />

      {/* Tiers */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Plans" title="Choose Your Level" center className="mb-14" />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
            {tiers.map(({ icon: Icon, name, price, period, desc, color, popular, perks }) => (
              <div
                key={name}
                className={`rounded-3xl p-8 relative overflow-hidden transition-all ${
                  popular
                    ? 'bg-pink-600 text-white ring-2 ring-pink-400 shadow-xl shadow-pink-500/30'
                    : 'bg-gray-50 hover:shadow-lg'
                }`}
              >
                {popular && (
                  <span className="absolute top-5 right-5 px-3 py-1 bg-white text-pink-600 text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${popular ? 'bg-white/20' : 'bg-pink-50'}`}>
                  <Icon className={`w-6 h-6 ${popular ? 'text-white' : 'text-pink-600'}`} />
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
                      <span className={`font-bold flex-shrink-0 mt-0.5 ${popular ? 'text-white' : 'text-pink-500'}`}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setForm({ ...form, tier: name })}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    popular
                      ? 'bg-white text-pink-600 hover:bg-pink-50'
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

      {/* Sign up form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Join Today" title="Create Your Account" center className="mb-10" />

          {sent ? (
            <div className="text-center bg-white rounded-3xl p-12 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Crown className="w-9 h-9 text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-navy-950 text-2xl">Welcome to GirlyTech!</h3>
              <p className="text-gray-500 mt-2">Check your email for your welcome pack and next steps.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Membership Tier</label>
                <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors">
                  {tiers.map((t) => <option key={t.name}>{t.name} — {t.price}{t.period}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Send className="w-4 h-4" /> Create Membership
              </button>
            </form>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  )
}
