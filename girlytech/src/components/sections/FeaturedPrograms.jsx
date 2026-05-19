import { ArrowRight, Clock, Users, Monitor, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { programs } from '@data/programs'

const tagVariant = (tag) => {
  if (tag === 'Free' || tag === 'Scholarship') return 'green'
  if (tag === 'Advanced') return 'navy'
  return 'gray'
}

export default function FeaturedPrograms() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="What We Offer"
            title="Programs Built for Her"
            subtitle="From beginner bootcamps to advanced masterclasses — every program is designed with girls in mind."
          />
          <Button to="/programs" variant="outline-dark" size="md" iconRight={<ArrowRight className="w-4 h-4" />} className="flex-shrink-0">
            All Programs
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {programs.slice(0, 3).map((prog) => (
            <article
              key={prog.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Card header */}
              <div className={`h-44 bg-gradient-to-br ${prog.gradient} relative overflow-hidden flex items-end p-6`}>
                <div className="absolute inset-0 section-dots opacity-30" />
                <span className="absolute top-4 right-5 text-6xl opacity-20 group-hover:opacity-35 transition-opacity select-none">
                  {prog.icon}
                </span>
                <span className="text-5xl relative z-10">{prog.icon}</span>
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {prog.tags.map((tag) => <Badge key={tag} variant={tagVariant(tag)}>{tag}</Badge>)}
                </div>
                <h3 className="font-display font-bold text-navy-950 text-lg leading-snug group-hover:text-pink-600 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{prog.description}</p>

                <div className="mt-5 grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5"><Clock    className="w-3.5 h-3.5 text-pink-400" />{prog.duration}</span>
                  <span className="flex items-center gap-1.5"><Users    className="w-3.5 h-3.5 text-pink-400" />Age {prog.ageGroup}</span>
                  <span className="flex items-center gap-1.5"><Monitor  className="w-3.5 h-3.5 text-pink-400" />{prog.mode}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-pink-400" />{prog.spotsLeft} spots left</span>
                </div>

                <Link
                  to="/programs"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 border-2 border-navy-950 text-navy-950 text-sm font-bold rounded-xl hover:bg-navy-950 hover:text-white transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
