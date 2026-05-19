import { Linkedin, Twitter, Instagram } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import CallToAction from '@components/sections/CallToAction'
import { team } from '@data/team'

const partners = [
  'MTC Namibia', 'Namibia University of Science & Technology', 'TechNamibia',
  'FNB Namibia', 'Bank of Namibia', 'Telecom Namibia',
]

const socialIcon = { linkedin: Linkedin, twitter: Twitter, instagram: Instagram }

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About GirlyTech"
        title="We Exist for One Reason: Her Future"
        subtitle="A community-driven organization committed to making STEM careers accessible to girls from all backgrounds — especially those who need it most."
      />

      {/* Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading eyebrow="Our Story" title="Born from a Need, Grown from Love" />
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  GirlyTech was founded when our team witnessed firsthand how the lack of access to quality STEM education was holding back an entire generation of brilliant girls. We saw the gap between potential and opportunity — and decided to close it.
                </p>
                <p>
                  Starting with a single coding workshop in Windhoek with just 15 girls, we have grown into a regional force for change. Today, we operate 12 programs, partner with leading tech companies, and have impacted over 2,500 young women across Namibia and beyond.
                </p>
                <p>
                  We are a passionate team of educators, mentors, and professionals who believe that the next great tech innovation will come from a girl who just needed someone to believe in her first.
                </p>
              </div>
            </div>

            {/* Visual stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '2020', label: 'Founded',         bg: 'bg-navy-950 text-white' },
                { val: '2,500+', label: 'Girls Reached', bg: 'bg-pink-600 text-white' },
                { val: '12',   label: 'Programs',        bg: 'bg-gray-50 text-navy-950' },
                { val: '8',    label: 'Communities',     bg: 'bg-gray-50 text-navy-950' },
              ].map(({ val, label, bg }) => (
                <div key={label} className={`${bg} rounded-2xl p-8 flex flex-col justify-between min-h-36`}>
                  <span className="text-4xl font-display font-black">{val}</span>
                  <span className="text-sm font-medium opacity-70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-950 rounded-3xl p-8 lg:p-10">
              <span className="inline-block px-3 py-1 bg-pink-500/15 text-pink-400 text-xs font-bold uppercase tracking-wider rounded-full mb-5">Mission</span>
              <p className="text-white font-display font-bold text-xl lg:text-2xl leading-snug">
                GirlyTech empowers girls and young women to pursue careers in STEM by giving them the skills and mentorship needed to succeed.
              </p>
            </div>
            <div className="bg-pink-600 rounded-3xl p-8 lg:p-10">
              <span className="inline-block px-3 py-1 bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-5">Vision</span>
              <p className="text-white font-display font-bold text-xl lg:text-2xl leading-snug">
                We envision a future where women and girls lead in technology, contributing innovative solutions to global challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Team"
            title="Meet the People Behind the Mission"
            subtitle="Educators, engineers, and community builders united by a single purpose."
            center
            className="mb-14"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.id} className="group bg-gray-50 hover:bg-navy-950 rounded-3xl p-7 transition-all duration-300 border border-gray-100 hover:border-transparent">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 group-hover:text-white text-sm transition-colors">{member.name}</h3>
                    <p className="text-xs text-pink-600 group-hover:text-pink-400 transition-colors font-medium mt-0.5">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors">{member.bio}</p>
                <div className="flex gap-2.5 mt-5">
                  {Object.entries(member.social).map(([platform, href]) => {
                    const Icon = socialIcon[platform]
                    return Icon ? (
                      <a key={platform} href={href} className="w-8 h-8 rounded-lg bg-gray-200/80 group-hover:bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-all">
                        <Icon className="w-3.5 h-3.5 text-gray-600 group-hover:text-white" />
                      </a>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Trusted & Supported By</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((p) => (
              <span key={p} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-pink-200 hover:text-pink-600 transition-all cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
