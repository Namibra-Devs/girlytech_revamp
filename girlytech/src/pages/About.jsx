import { useEffect, useRef } from 'react'
import { Linkedin, Twitter, Instagram, Facebook, BookOpen, Network, UserCheck, Heart } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import MissionVision from '@components/sections/MissionVision'
import CallToAction from '@components/sections/CallToAction'
import { useReveal } from '@hooks/useReveal'
import { team } from '@data/team'

const beliefs = [
  {
    icon: BookOpen,
    title: 'Practical & Project-Oriented Curriculum',
    desc: 'We offer hands-on learning experiences that go beyond theory, enabling our girls to work on real-world projects and develop the skills needed for future careers in STEM.',
  },
  {
    icon: Network,
    title: 'Networking',
    desc: 'We provide opportunities for our girls to connect with industry professionals, peers, and like-minded individuals, helping them build valuable relationships in the STEM field.',
  },
  {
    icon: UserCheck,
    title: 'One-on-One Mentorship',
    desc: 'We pair each girl with a dedicated mentor who provides personalized guidance, helping them navigate their educational and career paths with confidence.',
  },
  {
    icon: Heart,
    title: 'Sisterhood',
    desc: 'We foster a strong sense of community and belonging, creating a supportive environment where girls connect, collaborate, and uplift one another as they pursue their dreams.',
  },
]

const stats = [
  { val: '2020',   label: 'Founded' },
  { val: '2,500+', label: 'Girls Reached' },
  { val: '12',     label: 'Programs' },
  { val: '8',      label: 'Communities' },
]

const partners = [
  'MTC Namibia', 'Namibia University of Science & Technology', 'TechNamibia',
  'FNB Namibia', 'Bank of Namibia', 'Telecom Namibia',
]

const socialIcon = { linkedin: Linkedin, facebook: Facebook, twitter: Twitter, instagram: Instagram }

export default function About() {
  const whoRef    = useReveal()
  const statsRef  = useReveal()
  const teamRef   = useReveal()

  /* Parallax blobs for Who We Are section */
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)
  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${y * 0.05}px)`
        if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${y * -0.04}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <PageHero
        eyebrow="About GirlyTech"
        title="We Exist for One Reason: Her Future"
        subtitle="A community-driven organization committed to making STEM careers accessible to girls from all backgrounds — especially those who need it most."
      />

      {/* ── Who We Are ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div ref={blob1Ref} className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-3xl will-change-transform pointer-events-none" />
        <div ref={blob2Ref} className="absolute -bottom-24 -left-24 w-80 h-80 bg-navy-950/5 rounded-full blur-3xl will-change-transform pointer-events-none" />

        <div ref={whoRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionHeading
              eyebrow="Who We Are"
              title="Born from a Need, Grown from Love"
              subtitle="We are committed to closing the gender gap in STEM by providing resources, mentorship, and hands-on learning to girls from underserved communities."
              className="mb-14"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: story paragraphs */}
            <div data-reveal data-reveal-from="left" className="space-y-5 text-gray-600 leading-relaxed">
              <p className="text-base">
                GirlyTech was founded with a passion for inclusion and a vision for a brighter future. We are committed to closing the gender gap in STEM by providing resources, mentorship, and hands-on learning opportunities to girls from underserved communities. Our goal is to support and encourage these girls as they work towards successful careers in STEM.
              </p>
              <p className="text-base">
                GirlyTech is a community-driven organization committed to making STEM education and careers accessible to young girls, especially those from underserved communities. We are a passionate team of educators, mentors, and professionals who believe in the transformative power of education. Our goal is to inspire and empower the next generation of female leaders in technology by providing them with the resources, support, and opportunities they need to succeed.
              </p>
              <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider pt-2">At GirlyTech, we believe in:</p>
            </div>

            {/* Right: beliefs grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {beliefs.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  data-reveal
                  data-reveal-delay={i * 100}
                  data-reveal-from="right"
                  className="group bg-gray-50 hover:bg-navy-950 rounded-2xl p-6 transition-all duration-300 border border-gray-100 hover:border-transparent"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-700/10 group-hover:bg-blue-700/20 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5 text-blue-700 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h4 className="font-bold text-sm text-navy-950 group-hover:text-white transition-colors mb-2">{title}</h4>
                  <p className="text-xs text-gray-500 group-hover:text-white/55 leading-relaxed transition-colors">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────── */}
      <section className="bg-navy-950 py-14">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {stats.map(({ val, label }, i) => (
              <div
                key={label}
                data-reveal
                data-reveal-from="scale"
                data-reveal-delay={i * 80}
                className="bg-navy-950 flex flex-col items-center justify-center py-10 px-6 text-center"
              >
                <span className="font-display font-black text-5xl lg:text-6xl text-white">{val}</span>
                <span className="text-white/50 text-sm font-medium mt-2">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ───────────────────────────── */}
      <MissionVision />

      {/* ── Team ──────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
        <div ref={teamRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionHeading
              eyebrow="The Team"
              title="Meet the People Behind the Mission"
              subtitle="Educators, engineers, and community builders united by a single purpose."
              center
              className="mb-14"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {team.map((member, i) => (
              <div
                key={member.id}
                data-reveal
                data-reveal-delay={i * 80}
                className="group bg-white hover:bg-navy-950 rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Profile image */}
                <div className="h-76 relative overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-navy-950 group-hover:text-white text-base transition-colors">{member.name}</h3>
                  <p className="text-xs text-blue-700 group-hover:text-blue-400 font-semibold mt-0.5 transition-colors">{member.role}</p>
                  <p className="text-sm text-gray-500 group-hover:text-white/60 leading-relaxed mt-3 transition-colors">{member.bio}</p>

                  {/* Socials */}
                  <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100 group-hover:border-white/10 transition-colors">
                    {Object.entries(member.social).map(([platform, href]) => {
                      const Icon = socialIcon[platform]
                      return Icon ? (
                        <a
                          key={platform}
                          href={href}
                          aria-label={platform}
                          className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-white/10 hover:!bg-blue-700 flex items-center justify-center transition-all"
                        >
                          <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                        </a>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       

      <CallToAction />
    </>
  )
}
