import { useState, useCallback, useRef } from 'react'
import { Heart, Shield, RefreshCw, Zap, BookOpen, Users, Award } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Toast from '@components/ui/Toast'

const tiers = [
  {
    label: 'Supporter',
    amount: 500,
    icon: Heart,
    perks: ['Recognition on our website', 'Monthly impact newsletter', 'GirlyTech digital badge'],
  },
  {
    label: 'Champion',
    amount: 2000,
    icon: Zap,
    popular: true,
    perks: ["Fund a girl's program month", 'Exclusive supporter community', 'Quarterly impact report', 'GirlyTech branded kit'],
  },
  {
    label: 'Changemaker',
    amount: 5000,
    icon: Award,
    perks: ['Full scholarship sponsorship', 'Name on scholarship certificate', 'Annual gala invitation', 'Dedicated impact dashboard', 'Direct mentee introductions'],
  },
]

const impacts = [
  { icon: BookOpen, label: '₵200',    desc: 'Covers learning materials for one girl for a month' },
  { icon: Users,    label: '₵500',    desc: "Funds one girl's program fees for a full month" },
  { icon: Award,    label: '₵2,000',  desc: 'Sponsors a full scholarship for one program cohort' },
  { icon: Heart,    label: '₵10,000', desc: 'Funds an entire bootcamp for 10 girls' },
]

export default function Donate() {
  const [selected,  setSelected]  = useState(2000)
  const [custom,    setCustom]    = useState('')
  const [recurring, setRecurring] = useState(false)
  const [toast,     setToast]     = useState({ show: false, message: '' })
  const formRef = useRef(null)

  const hideToast = useCallback(() => setToast((t) => ({ ...t, show: false })), [])

  const presets = [200, 500, 1000, 2000, 5000]
  const final   = custom ? Number(custom) : selected

  const scrollToForm = (amount) => {
    setSelected(amount)
    setCustom('')
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleDonate = (e) => {
    e.preventDefault()
    setToast({ show: true, message: `Thank you! Your ${recurring ? 'monthly' : 'one-time'} donation of ₵${final.toLocaleString()} is being processed.` })
  }

  return (
    <>
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      <PageHero
        eyebrow="Donate"
        title="Your Gift Changes Lives"
        subtitle="Every contribution — big or small — helps a girl step into her tech future. 100% goes directly to our programs."
      />

      {/* Trust bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2"><Shield    className="w-4 h-4 text-emerald-500" />Secure, encrypted payments</span>
          <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-blue-500"    />Cancel recurring donations anytime</span>
          <span className="flex items-center gap-2"><Heart     className="w-4 h-4 text-blue-500"    />100% goes to programs</span>
        </div>
      </div>

      {/* ── Donation form ───────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">

            {/* Amount selector */}
            <div ref={formRef} className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy-950 text-2xl mb-2">Choose Your Impact</h2>
              <p className="text-gray-500 text-sm mb-7">Select an amount or enter a custom contribution.</p>

              {/* Recurring toggle */}
              <div className="flex items-center gap-3 mb-7 p-4 bg-gray-50 rounded-2xl">
                <button onClick={() => setRecurring(false)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${!recurring ? 'bg-navy-950 text-white shadow-md' : 'text-gray-500'}`}>
                  One-time
                </button>
                <button onClick={() => setRecurring(true)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${recurring ? 'bg-navy-950 text-white shadow-md' : 'text-gray-500'}`}>
                  Monthly
                </button>
              </div>

              {/* Preset amounts */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-5">
                {presets.map((amt) => (
                  <button key={amt} onClick={() => { setSelected(amt); setCustom('') }}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      selected === amt && !custom
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}>
                    ₵{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="relative mb-8">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">₵</span>
                <input type="number" value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(0) }}
                  placeholder="Enter custom amount"
                  className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-sm text-navy-950 placeholder-gray-400 focus:outline-none transition-colors" />
              </div>

              {/* Summary */}
              <div className="bg-navy-950 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/50 text-xs">Your {recurring ? 'monthly' : 'one-time'} donation</p>
                    <p className="text-white font-display font-black text-3xl mt-1">
                      ₵{(final || 0).toLocaleString()}
                    </p>
                  </div>
                  <Heart className="w-10 h-10 text-blue-500/50" />
                </div>
              </div>

              <form onSubmit={handleDonate}>
                <button type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.01] transition-all">
                  <Heart className="w-5 h-5" />
                  Donate ₵{(final || 0).toLocaleString()} {recurring ? 'Monthly' : 'Now'}
                </button>
              </form>
              <p className="text-center text-xs text-gray-400 mt-3">Secure checkout powered by Stripe</p>
            </div>

            {/* Impact sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-navy-950 mb-5">Your Money At Work</h3>
                <div className="space-y-4">
                  {impacts.map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy-950">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-navy-950 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 section-dots opacity-20" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">Total Impact</p>
                  <p className="text-white font-display font-black text-3xl">2,500+</p>
                  <p className="text-white/50 text-sm mt-1">girls empowered by donors like you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Giving tiers ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Giving Levels" title="Become a Named Supporter" center className="mb-14" />
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map(({ label, amount, icon: Icon, popular, perks }) => (
              <div key={label}
                className={`rounded-3xl p-8 relative overflow-hidden ${popular ? 'bg-navy-950 text-white ring-2 ring-blue-500 shadow-xl shadow-navy-950/20' : 'bg-gray-50'}`}>
                {popular && (
                  <span className="absolute top-5 right-5 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">Most Popular</span>
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${popular ? 'bg-white/15' : 'bg-blue-50'}`}>
                  <Icon className={`w-6 h-6 ${popular ? 'text-blue-400' : 'text-blue-700'}`} />
                </div>
                <h3 className={`font-display font-bold text-2xl ${popular ? 'text-white' : 'text-navy-950'}`}>{label}</h3>
                <p className={`text-3xl font-black mt-1 mb-6 ${popular ? 'text-blue-400' : 'text-navy-950'}`}>
                  ₵{amount.toLocaleString()}<span className="text-base font-normal opacity-50">/mo</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {perks.map((perk) => (
                    <li key={perk} className={`flex items-start gap-2 text-sm ${popular ? 'text-white/75' : 'text-gray-600'}`}>
                      <span className={`mt-0.5 flex-shrink-0 ${popular ? 'text-blue-400' : 'text-blue-600'}`}>✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToForm(amount)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-navy-950 hover:bg-navy-900 text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
