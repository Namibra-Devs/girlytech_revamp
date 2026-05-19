import { ArrowRight, Clock, Users, Monitor, BookOpen, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import Newsletter from '@components/sections/Newsletter'
import { programs } from '@data/programs'

const tagVariant = (tag) => {
  if (tag === 'Free' || tag === 'Scholarship') return 'green'
  if (tag === 'Advanced') return 'navy'
  return 'gray'
}

const steps = [
  { step: '01', title: 'Choose a Program', desc: 'Browse our programs and find the right fit for your level and interests.' },
  { step: '02', title: 'Apply Online', desc: 'Fill out a short application form. No prior experience required for beginner tracks.' },
  { step: '03', title: 'Get Accepted', desc: 'We review applications on a rolling basis and notify you within 5 business days.' },
  { step: '04', title: 'Start Learning', desc: 'Attend orientation, meet your cohort and mentors, and begin your STEM journey.' },
]

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Skills That Open Every Door"
        subtitle="From zero-experience bootcamps to advanced masterclasses — every program is designed specifically for girls and young women ready to lead in tech."
      />

      {/* Program grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="All Programs" title="Find Your Path" center className="mb-14" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {programs.map((prog) => (
              <article
                key={prog.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className={`h-44 bg-gradient-to-br ${prog.gradient} relative overflow-hidden flex items-end p-6`}>
                  <div className="absolute inset-0 section-dots opacity-30" />
                  <span className="absolute top-4 right-5 text-6xl opacity-20 group-hover:opacity-40 transition-opacity select-none">{prog.icon}</span>
                  <span className="text-5xl relative z-10">{prog.icon}</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {prog.tags.map((tag) => <Badge key={tag} variant={tagVariant(tag)}>{tag}</Badge>)}
                  </div>
                  <h3 className="font-display font-bold text-navy-950 text-lg leading-snug group-hover:text-pink-600 transition-colors">{prog.title}</h3>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{prog.category}</p>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{prog.description}</p>

                  <div className="mt-5 grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5"><Clock    className="w-3.5 h-3.5 text-pink-400" />{prog.duration}</span>
                    <span className="flex items-center gap-1.5"><Users    className="w-3.5 h-3.5 text-pink-400" />Age {prog.ageGroup}</span>
                    <span className="flex items-center gap-1.5"><Monitor  className="w-3.5 h-3.5 text-pink-400" />{prog.mode}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-pink-400" />{prog.spotsLeft} spots left</span>
                  </div>

                  <button className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-navy-950 text-navy-950 text-sm font-bold rounded-xl hover:bg-navy-950 hover:text-white transition-all">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How It Works" title="Applying Is Easy" center className="mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-navy-950 text-white font-display font-black text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-bold text-navy-950">{title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
