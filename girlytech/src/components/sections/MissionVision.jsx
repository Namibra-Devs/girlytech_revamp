import { Target, Eye } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'

const values = [
  { label: 'Inclusivity',  desc: 'Every girl belongs here' },
  { label: 'Excellence',   desc: 'We raise the bar, always' },
  { label: 'Community',    desc: 'Stronger together' },
  { label: 'Innovation',   desc: 'Ideas that change the world' },
]

export default function MissionVision() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who We Are"
          title="Purpose-Driven & Community-Led"
          subtitle="We believe in the transformative power of education and are committed to making STEM accessible for every girl, especially those from underserved communities."
          center
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission card */}
          <div className="relative group bg-gradient-to-br from-navy-950 to-navy-900 rounded-3xl p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/20 transition-all duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/25 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-pink-400" />
              </div>
              <span className="inline-block px-3 py-1 bg-pink-500/15 text-pink-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Our Mission
              </span>
              <p className="text-white text-xl lg:text-2xl font-display font-bold leading-snug">
                GirlyTech empowers girls and young women to pursue careers in STEM by giving them the skills and mentorship needed to succeed.
              </p>
              <div className="mt-7 h-px bg-gradient-to-r from-pink-500/50 to-transparent" />
              <p className="mt-5 text-white/55 text-sm leading-relaxed">
                We provide hands-on training, mentorship connections, and clear career pathways that make tech a real and achievable future for every girl.
              </p>
            </div>
          </div>

          {/* Vision card */}
          <div className="relative group bg-gradient-to-br from-pink-600 to-pink-800 rounded-3xl p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-all duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Our Vision
              </span>
              <p className="text-white text-xl lg:text-2xl font-display font-bold leading-snug">
                We envision a future where women and girls lead in technology, contributing innovative solutions to global challenges.
              </p>
              <div className="mt-7 h-px bg-gradient-to-r from-white/30 to-transparent" />
              <p className="mt-5 text-white/65 text-sm leading-relaxed">
                A world where diversity in tech is the norm — where every brilliant mind, regardless of gender or background, shapes our technological future.
              </p>
            </div>
          </div>
        </div>

        {/* Values row */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.map(({ label, desc }) => (
            <div
              key={label}
              className="group bg-gray-50 hover:bg-navy-950 rounded-2xl p-6 transition-all duration-300 cursor-default"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500 mb-4 group-hover:scale-150 transition-transform" />
              <h4 className="font-bold text-sm text-navy-950 group-hover:text-white transition-colors">{label}</h4>
              <p className="text-xs text-gray-400 group-hover:text-white/50 mt-1 transition-colors">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
