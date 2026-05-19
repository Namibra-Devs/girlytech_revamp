import { Users, Code, Award, MapPin, BookOpen, Heart } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'

const stats = [
  { icon: Users,    value: '2,500+', label: 'Girls Empowered',       desc: 'Across all our programs' },
  { icon: Code,     value: '12',     label: 'Active Programs',        desc: 'Running year-round' },
  { icon: Award,    value: '150+',   label: 'Mentors & Volunteers',   desc: 'Industry professionals' },
  { icon: MapPin,   value: '8',      label: 'Communities Reached',    desc: 'Across the region' },
  { icon: BookOpen, value: '95%',    label: 'Program Completion Rate',desc: 'Among enrolled students' },
  { icon: Heart,    value: '300+',   label: 'Scholarships Awarded',   desc: 'To underserved girls' },
]

export default function ImpactStats() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0d1f50] relative overflow-hidden">
      <div className="absolute inset-0 section-dots opacity-25" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Impact"
          title="Numbers That Tell Our Story"
          subtitle="Every number represents a life touched, a dream realized, and a future shaped by opportunity and belief."
          center
          light
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {stats.map(({ icon: Icon, value, label, desc }) => (
            <div
              key={label}
              className="glass rounded-2xl p-6 lg:p-8 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 group-hover:bg-pink-500/35 transition-colors">
                <Icon className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-display font-black text-white">{value}</div>
              <div className="text-sm font-semibold text-white mt-1">{label}</div>
              <div className="text-xs text-white/40 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
