import { ArrowRight, Users, BookOpen, Star, Globe } from 'lucide-react'
import Button from '@components/ui/Button'

const stats = [
  { label: 'Girls Impacted',       value: '2,500+', icon: Users },
  { label: 'Active Programs',      value: '12',      icon: BookOpen },
  { label: 'Mentors & Volunteers', value: '150+',    icon: Star },
  { label: 'Communities Reached',  value: '8',       icon: Globe },
]

const avatarColors = ['#ec4899', '#2563eb', '#7c3aed', '#059669', '#d97706']
const initials     = ['A', 'M', 'Z', 'K', 'T']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-navy-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0d1f50]" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-pink-600/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      <div className="absolute inset-0 section-dots" />

      {/* Floating badges */}
      <div className="absolute top-28 right-6 xl:right-32 hidden md:block z-10">
        <div className="glass rounded-2xl px-4 py-3 text-white text-sm font-medium shadow-lg">
          🎓 Scholarships Available
        </div>
      </div>
      <div className="absolute top-52 right-20 xl:right-56 hidden lg:block z-10">
        <div className="glass rounded-2xl px-4 py-3 text-white text-sm font-medium shadow-lg">
          💻 Free Coding Bootcamps
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-white text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              Empowering the Next Generation of Women in Tech
            </div>

            <h1 className="font-display font-black text-white leading-[1.08] text-5xl sm:text-6xl lg:text-7xl">
              Girls Who Code,
              <br />
              <span className="gradient-text">Lead the World</span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-white/65 leading-relaxed max-w-2xl">
              GirlyTech empowers girls and young women to pursue careers in STEM by giving them the skills and mentorship needed to succeed. We are building the next generation of female tech leaders.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Button to="/programs" variant="secondary" size="lg" iconRight={<ArrowRight className="w-5 h-5" />}>
                Explore Programs
              </Button>
              <Button to="/about" variant="outline" size="lg">
                Our Story
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-12">
              <div className="flex -space-x-2.5">
                {initials.map((init, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-navy-950 flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: avatarColors[i] }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Join 2,500+ girls</p>
                <p className="text-xs text-white/50">already transforming their futures with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 px-6 py-6 ${i < 3 ? 'border-r border-white/10' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-white/10' : ''}`}
              >
                <div className="w-11 h-11 rounded-xl bg-pink-600/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white">{value}</div>
                  <div className="text-xs text-white/45">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
