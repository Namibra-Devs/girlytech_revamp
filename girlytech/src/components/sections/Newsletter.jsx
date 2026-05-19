import { useRef } from 'react'
import { Mail, ArrowRight, Bell } from 'lucide-react'
import { useReveal } from '@hooks/useReveal'

export default function Newsletter() {
  const revealRef = useReveal()

  return (
    <section className="py-20 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 section-dots opacity-20" />
      <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      <div ref={revealRef} className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-reveal data-reveal-from="scale" className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
          <Bell className="w-8 h-8 text-white" />
        </div>
        <h2 data-reveal data-reveal-delay="80" className="font-display font-bold text-white text-4xl lg:text-5xl">
          Never Miss an Opportunity
        </h2>
        <p data-reveal data-reveal-delay="160" className="text-white/75 text-lg mt-4 max-w-md mx-auto">
          Programs, scholarships, events, and opportunities delivered straight to your inbox.
        </p>

        <form
          data-reveal
          data-reveal-delay="240"
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
            <input
              type="email"
              placeholder="Your email address"
              className="w-full pl-11 pr-4 py-4 bg-white/15 border border-white/25 rounded-xl text-white placeholder-white/45 text-sm focus:outline-none focus:border-white focus:bg-white/20 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-7 py-4 bg-white text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 flex-shrink-0"
          >
            Subscribe <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p data-reveal data-reveal-delay="320" className="text-white/40 text-xs mt-4">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
