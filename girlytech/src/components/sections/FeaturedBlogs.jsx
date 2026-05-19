import { useEffect, useRef } from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import { blogPosts } from '@data/blog'
import { useReveal } from '@hooks/useReveal'

const heroImages = ['/images/hero1.webp', '/images/hero2.webp', '/images/hero3.webp']

export default function FeaturedBlogs() {
  const revealRef = useReveal()
  const blob1Ref  = useRef(null)
  const blob2Ref  = useRef(null)

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${y * -0.06}px)`
        if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${y * 0.05}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0d1f50] relative overflow-hidden">
      <div className="absolute inset-0 section-dots opacity-20" />
      <div ref={blob1Ref} className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-700/15 rounded-full blur-3xl will-change-transform pointer-events-none" />
      <div ref={blob2Ref} className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl will-change-transform pointer-events-none" />

      <div ref={revealRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Latest Insights"
            title="Stories, Research & News"
            subtitle="Perspectives from our community — educators, graduates, mentors, and the girls leading the change."
            light
          />
          <Button to="/blog" variant="outline" size="md" iconRight={<ArrowRight className="w-4 h-4" />} className="flex-shrink-0 border-white/30 text-white hover:bg-white/10">
            All Articles
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {blogPosts.slice(0, 3).map((post, i) => (
            <article
              key={post.id}
              data-reveal
              data-reveal-delay={i * 120}
              className="group glass rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-52 relative overflow-hidden">
                <img
                  src={heroImages[i % 3]}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-700 text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white/65 text-xs">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm mt-3 leading-relaxed line-clamp-3">{post.excerpt}</p>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: post.authorColor }}
                    >
                      {post.authorInitials}
                    </div>
                    <div>
                      <span className="text-white/70 text-xs block font-medium">{post.author}</span>
                      <span className="text-white/35 text-xs">
                        {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/blog"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors"
                  >
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
