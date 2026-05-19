import { ArrowRight, Clock, Tag } from 'lucide-react'
import PageHero from '@components/ui/PageHero'
import SectionHeading from '@components/ui/SectionHeading'
import Badge from '@components/ui/Badge'
import Newsletter from '@components/sections/Newsletter'
import { blogPosts } from '@data/blog'

const catVariant = { Education: 'blue', Stories: 'pink', Research: 'navy', News: 'amber', Tutorial: 'green' }

function fmtDate(s) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Blog() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Stories, Insights & Guides"
        subtitle="Inspiration, research, and practical guides for girls shaping their tech futures."
      />

      {/* Featured post */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Featured" title="Editor's Pick" className="mb-10" />

          <div className="group grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className={`h-64 lg:h-auto bg-gradient-to-br ${featured.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 section-dots opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center text-white/15 font-display font-black text-9xl select-none">
                {featured.category[0]}
              </div>
            </div>
            <div className="p-8 lg:p-10 bg-white">
              <div className="flex gap-2 mb-4">
                <Badge variant={catVariant[featured.category] || 'gray'}>{featured.category}</Badge>
              </div>
              <h2 className="font-display font-bold text-navy-950 text-2xl lg:text-3xl leading-tight group-hover:text-pink-600 transition-colors">
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
              <button className="mt-7 flex items-center gap-2 px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white text-sm font-bold rounded-xl transition-colors">
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Latest" title="More From Our Blog" className="mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`h-40 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 section-dots opacity-25" />
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 font-display font-black text-8xl select-none">
                    {post.category[0]}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <Badge variant={catVariant[post.category] || 'gray'}>{post.category}</Badge>
                  </div>
                  <h3 className="font-display font-bold text-navy-950 text-lg leading-snug group-hover:text-pink-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: post.authorColor }}>
                      {post.authorInitials}
                    </div>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <button className="mt-4 flex items-center gap-1.5 text-sm font-bold text-pink-600 hover:text-pink-500 transition-colors">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
