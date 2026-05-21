import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Clock, X, Tag } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import ContactSection from '@components/sections/ContactSection'
import { blogPosts } from '@data/blog'

const catVariant = { Education: 'blue', Stories: 'navy', Research: 'navy', News: 'amber', Tutorial: 'green' }

function fmtDate(s) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function ArticleModal({ post, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="h-56 relative overflow-hidden rounded-t-3xl flex-shrink-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-5 flex gap-2">
            <Badge variant={catVariant[post.category] || 'gray'}>{post.category}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-9">
          <h2 className="font-display font-bold text-navy-950 text-2xl sm:text-3xl leading-tight">{post.title}</h2>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: post.authorColor }}>
                {post.authorInitials}
              </div>
              <span className="font-medium text-gray-600">{post.author}</span>
            </div>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            <span>{fmtDate(post.date)}</span>
          </div>

          <div className="mt-6 space-y-4">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-sm sm:text-base">{para}</p>
            ))}
          </div>

          <div className="mt-7 pt-5 border-t border-gray-100 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const [openPost, setOpenPost]   = useState(null)
  const [featured, ...rest]       = blogPosts

  const open  = useCallback((post) => setOpenPost(post), [])
  const close = useCallback(() => setOpenPost(null), [])

  return (
    <>
      {openPost && <ArticleModal post={openPost} onClose={close} />}

      <PageHero
        eyebrow="Blog"
        title="Stories, Insights & Guides"
        subtitle="Inspiration, research, and practical guides for girls shaping their tech futures."
      />

      {/* ── Featured post ──────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Featured" title="Editor's Pick" className="mb-10" />

          <div
            className="group grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => open(featured)}
          >
            <div className="h-64 lg:h-auto relative overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
            </div>
            <div className="p-8 lg:p-10 bg-white flex flex-col justify-center">
              <div className="flex gap-2 mb-4">
                <Badge variant={catVariant[featured.category] || 'gray'}>{featured.category}</Badge>
              </div>
              <h2 className="font-display font-bold text-navy-950 text-2xl lg:text-3xl leading-tight group-hover:text-blue-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: featured.authorColor }}>
                    {featured.authorInitials}
                  </div>
                  {featured.author}
                </div>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                <span>·</span>
                <span>{fmtDate(featured.date)}</span>
              </div>
              <button
                className="mt-7 self-start flex items-center gap-2 px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white text-sm font-bold rounded-xl transition-colors"
                onClick={(e) => { e.stopPropagation(); open(featured) }}
              >
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog grid ──────────────────────────────────── */}
      <section className="pb-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Latest" title="More From Our Blog" className="mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => open(post)}
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <Badge variant={catVariant[post.category] || 'gray'}>{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-navy-950 text-lg leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: post.authorColor }}>
                      {post.authorInitials}
                    </div>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <button
                    className="mt-4 flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-600 transition-colors"
                    onClick={(e) => { e.stopPropagation(); open(post) }}
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
