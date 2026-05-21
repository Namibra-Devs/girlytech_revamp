import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Clock, Users, Monitor, BookOpen, X, Send } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import ContactSection from '@components/sections/ContactSection'
import Toast from '@components/ui/Toast'
import { useReveal } from '@hooks/useReveal'
import { programs } from '@data/programs'

const tagVariant = (tag) => {
  if (tag === 'Free' || tag === 'Scholarship') return 'green'
  if (tag === 'Advanced') return 'navy'
  return 'gray'
}

const steps = [
  { step: '01', title: 'Choose a Program',  desc: 'Browse our programs and find the right fit for your skill level, interests, and schedule.', tip: 'Use the program cards to compare formats — online, in-person, or hybrid.' },
  { step: '02', title: 'Apply Online',       desc: 'Fill out a short application form. No prior experience required for beginner tracks.', tip: 'Applications take less than 5 minutes. You can save and return anytime.' },
  { step: '03', title: 'Get Accepted',       desc: 'We review applications on a rolling basis and notify you within 5 business days.', tip: 'Scholarship applicants receive a priority review from our team.' },
  { step: '04', title: 'Start Learning',     desc: 'Attend your orientation session, meet your cohort and mentors, and begin your journey.', tip: 'Your dedicated mentor is assigned before your very first session.' },
]

function ApplyModal({ program, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', level: '', motivation: '' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
    onSuccess(`Application for "${program.title}" submitted! We'll be in touch within 5 business days.`)
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/65 flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header image */}
        <div className="h-36 relative overflow-hidden">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-navy-950/30" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-5">
            <p className="text-white font-display font-bold text-lg leading-tight">{program.title}</p>
            <p className="text-white/60 text-xs mt-0.5">{program.category} · {program.duration}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Experience Level</label>
            <select required value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors">
              <option value="">Select your level</option>
              <option>Complete Beginner</option>
              <option>Some Experience</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Why do you want to join?</label>
            <textarea required rows={3} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })}
              placeholder="Tell us what motivates you..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none" />
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Send className="w-4 h-4" /> Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Programs() {
  const [applyProg, setApplyProg] = useState(null)
  const [toast, setToast]         = useState({ show: false, message: '' })
  const revealRef = useReveal()
  const stepsRef  = useReveal()

  const hideToast  = useCallback(() => setToast((t) => ({ ...t, show: false })), [])
  const openApply  = useCallback((prog) => setApplyProg(prog), [])
  const closeApply = useCallback(() => setApplyProg(null), [])
  const onSuccess  = useCallback((msg) => setToast({ show: true, message: msg }), [])

  return (
    <>
      {applyProg && <ApplyModal program={applyProg} onClose={closeApply} onSuccess={onSuccess} />}
      <Toast show={toast.show} message={toast.message} onClose={hideToast} />

      <PageHero
        eyebrow="Programs"
        title="Skills That Open Every Door"
        subtitle="From zero-experience bootcamps to advanced masterclasses — every program is designed specifically for girls and young women ready to lead in tech."
      />

      {/* ── Program grid ───────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionHeading eyebrow="All Programs" title="Find Your Path" center className="mb-14" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {programs.map((prog, i) => (
              <article
                key={prog.id}
                data-reveal
                data-reveal-delay={i * 80}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={prog.image} alt={prog.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {prog.tags.map((tag) => <Badge key={tag} variant={tagVariant(tag)}>{tag}</Badge>)}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-navy-950 text-lg leading-snug group-hover:text-blue-700 transition-colors">{prog.title}</h3>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">{prog.category}</p>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{prog.description}</p>

                  <div className="mt-5 grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5"><Clock    className="w-3.5 h-3.5 text-blue-500" />{prog.duration}</span>
                    <span className="flex items-center gap-1.5"><Users    className="w-3.5 h-3.5 text-blue-500" />Age {prog.ageGroup}</span>
                    <span className="flex items-center gap-1.5"><Monitor  className="w-3.5 h-3.5 text-blue-500" />{prog.mode}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-500" />{prog.spotsLeft} spots left</span>
                  </div>

                  <button
                    onClick={() => openApply(prog)}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-navy-950 text-navy-950 text-sm font-bold rounded-xl hover:bg-navy-950 hover:text-white transition-all"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Apply — staggered vertical timeline ─ */}
      <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-700/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-950/4 rounded-full blur-3xl pointer-events-none" />

        <div ref={stepsRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div data-reveal>
            <SectionHeading eyebrow="How It Works" title="Your Journey Starts Here"
              subtitle="A simple, supportive process designed to get you into your program with confidence." center className="mb-16" />
          </div>

          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-7 bottom-7 w-0.5 bg-gradient-to-b from-blue-700/40 via-blue-700/20 to-transparent pointer-events-none" />
            <div className="space-y-8">
              {steps.map(({ step, title, desc, tip }, i) => (
                <div key={step} data-reveal data-reveal-delay={i * 120} className="relative flex gap-6 sm:gap-8">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-navy-950 text-white font-display font-black text-base sm:text-lg flex items-center justify-center shadow-lg shadow-navy-950/30 ring-4 ring-gray-50">
                      {step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
                    <h3 className="font-display font-bold text-navy-950 text-lg group-hover:text-blue-700 transition-colors">{title}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</p>
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2.5 text-xs font-semibold text-blue-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      {tip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
