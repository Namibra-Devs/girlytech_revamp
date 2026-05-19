import { Heart } from 'lucide-react'
import Button from '@components/ui/Button'

const options = [
  { label: 'Give a Scholarship', desc: "Fund a girl's journey into tech",    amount: 'From N$500',   color: 'text-pink-400' },
  { label: 'Sponsor a Bootcamp', desc: 'Fund a full program cohort',         amount: 'From N$5,000', color: 'text-blue-400' },
  { label: 'Volunteer',          desc: 'Give your time and skills',          amount: '2 hrs/week',   color: 'text-emerald-400' },
  { label: 'Partner With Us',    desc: 'Corporate & org-level partnership',  amount: 'Custom',       color: 'text-amber-400' },
]

export default function CallToAction() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 section-dots opacity-25" />
          <div className="absolute right-0 top-0 w-96 h-96 bg-pink-500/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <div className="relative p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="inline-block px-3 py-1 bg-pink-500/15 text-pink-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                Take Action
              </span>
              <h2 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight">
                Ready to Change a Girl's Future?
              </h2>
              <p className="text-white/60 text-lg mt-4 leading-relaxed">
                Whether you donate, volunteer, or spread the word — every action creates ripples of change for girls in STEM.
              </p>
              <div className="flex flex-wrap gap-4 mt-9">
                <Button to="/donate" variant="secondary" size="lg" icon={<Heart className="w-5 h-5" />}>
                  Donate Now
                </Button>
                <Button to="/volunteer" variant="outline" size="lg">
                  Become a Mentor
                </Button>
              </div>
            </div>

            {/* Right: option cards */}
            <div className="grid grid-cols-2 gap-3">
              {options.map(({ label, desc, amount, color }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-5 hover:bg-white/10 transition-all duration-200 group cursor-default"
                >
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${color}`}>{amount}</p>
                  <p className="text-white text-sm font-semibold leading-snug">{label}</p>
                  <p className="text-white/40 text-xs mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
