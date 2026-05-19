import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const cols = {
  'Get Involved': [
    { label: 'Programs',        to: '/programs' },
    { label: 'Volunteer',       to: '/volunteer' },
    { label: 'Become a Member', to: '/membership' },
    { label: 'Partner With Us', to: '/partner' },
  ],
  'Organisation': [
    { label: 'About Us',  to: '/about' },
    { label: 'Events',    to: '/events' },
    { label: 'Gallery',   to: '/gallery' },
    { label: 'Blog',      to: '/blog' },
  ],
  'Support': [
    { label: 'Contact Us',     to: '/contact' },
    { label: 'Donate',         to: '/donate' },
    { label: 'FAQ',            to: '/contact' },
    { label: 'Privacy Policy', to: '/contact' },
  ],
}

const socials = [
  { label: 'FB',  href: '#' },
  { label: 'TW',  href: '#' },
  { label: 'IG',  href: '#' },
  { label: 'LI',  href: '#' },
  { label: 'YT',  href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Stay Connected</p>
              <h3 className="font-display text-2xl font-bold text-white">Get updates in your inbox</h3>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-3 bg-white/8 border border-white/15 rounded-xl text-white placeholder-white/35 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-colors flex-shrink-0"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-5 w-fit group">
              <img
                src="/images/logo.webp"
                alt="GirlyTech"
                className="h-14 w-auto transition-opacity group-hover:opacity-85"
              />
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Empowering girls and young women to pursue careers in STEM through skills, mentorship, and community.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mt-6">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-blue-700 flex items-center justify-center text-[11px] font-bold transition-all hover:scale-110"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-7 space-y-2.5">
              <a href="mailto:hello@girlytech.org" className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                hello@girlytech.org
              </a>
              <a href="tel:+264811234567" className="flex items-center gap-2.5 text-sm text-white/55 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                +264 81 123 4567
              </a>
              <span className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                123 Independence Ave, Windhoek, Namibia
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/50 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} GirlyTech. All rights reserved.
            {' '}Made with <Heart className="w-3 h-3 inline text-blue-400 mx-0.5" /> for girls in STEM.
          </p>
          <div className="flex gap-5">
            <Link to="/contact" className="text-white/35 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-white/35 hover:text-white/60 text-xs transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
