import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ChevronDown, ChevronRight, Menu, X, Heart,
  Info, Users, BookOpen, UserCheck, UserPlus,
  Handshake, Calendar, Image, FileText, Mail,
} from 'lucide-react'

/* ── Data ─────────────────────────────────────────────────────── */
const involved = [
  { label: 'Programs',        to: '/programs',   icon: BookOpen,  desc: 'Explore our STEM training programs' },
  { label: 'Volunteer',       to: '/volunteer',  icon: UserCheck, desc: 'Give your time and skills' },
  { label: 'Become a Member', to: '/membership', icon: UserPlus,  desc: 'Join the GirlyTech community' },
  { label: 'Partner With Us', to: '/partner',    icon: Handshake, desc: 'Corporate & org partnerships' },
]

const mainLinks = [
  { label: 'About Us',     to: '/about',   icon: Info },
  { label: 'Get Involved', dropdown: involved, icon: Users },
  { label: 'Events',       to: '/events',  icon: Calendar },
  { label: 'Gallery',      to: '/gallery', icon: Image },
  { label: 'Blog',         to: '/blog',    icon: FileText },
  { label: 'Contact Us',   to: '/contact', icon: Mail },
]

/* ── Component ────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [deskDrop,    setDeskDrop]    = useState(false)   // desktop dropdown
  const [mobileDrop,  setMobileDrop]  = useState(false)   // mobile accordion
  const dropRef      = useRef(null)
  const hoverTimer   = useRef(null)
  const location     = useLocation()
  const isHome     = location.pathname === '/'

  /* scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* close everything on route change */
  useEffect(() => {
    setMobileOpen(false)
    setDeskDrop(false)
    setMobileDrop(false)
  }, [location.pathname])

  /* desktop dropdown — hover open/close with small leave-delay */
  const openDrop  = () => { clearTimeout(hoverTimer.current); setDeskDrop(true) }
  const closeDrop = () => { hoverTimer.current = setTimeout(() => setDeskDrop(false), 120) }

  /* close desktop dropdown on outside click (keyboard / accessibility fallback) */
  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDeskDrop(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const solid  = scrolled || !isHome
  const navBg  = solid
    ? 'bg-navy-950/96 backdrop-blur-md shadow-xl shadow-navy-950/30'
    : 'bg-transparent'

  return (
    <>
      {/* ── Main header bar ─────────────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <img
                src="/images/logo.webp"
                alt="GirlyTech"
                className="h-20 sm:h-15 w-auto transition-opacity group-hover:opacity-90"
              />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {mainLinks.map((link) =>
                link.dropdown ? (
                  /* Get Involved dropdown */
                  <li key={link.label} ref={dropRef} className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-all"
                    >
                      <link.icon className="w-3.5 h-3.5" />
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${deskDrop ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown panel */}
                    {deskDrop && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-navy-950/20 border border-gray-100 overflow-hidden z-50">
                        {involved.map(({ label, to, icon: Icon, desc }) => (
                          <Link
                            key={to}
                            to={to}
                            className="group/item flex items-start gap-3.5 px-5 py-3.5 hover:bg-navy-50 border-b border-gray-50 last:border-0 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover/item:bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                              <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-navy-950 group-hover/item:text-blue-600 transition-colors block">{label}</span>
                              <span className="text-xs text-gray-400">{desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                          isActive ? 'text-white bg-white/15' : 'text-white/75 hover:text-white hover:bg-white/10'
                        }`
                      }
                    >
                      <link.icon className="w-3.5 h-3.5" />
                      {link.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            {/* Right: Donate + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                to="/donate"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.04] transition-all"
              >
                <Heart className="w-4 h-4" />
                Donate
              </Link>

              {/* Hamburger — always above overlay (z-[60]) */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                aria-label="Toggle navigation"
              >
                <span
                  className="transition-all duration-300"
                  style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'rotate(90deg) scale(0)' : 'none', position: 'absolute' }}
                >
                  <Menu className="w-5 h-5" />
                </span>
                <span
                  className="transition-all duration-300"
                  style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? 'none' : 'rotate(-90deg) scale(0)', position: 'absolute' }}
                >
                  <X className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Full-screen mobile menu overlay ─────────────────── */}
      {/*
        The circle expands from the hamburger button's position (top-right).
        z-[55] sits above the main nav (z-50) so the overlay covers everything,
        while the hamburger button (z-[60]) stays clickable on top.
      */}
      <div
        aria-hidden={!mobileOpen}
        className="lg:hidden fixed inset-0 z-[55] bg-navy-950 flex flex-col overflow-y-auto"
        style={{
          clipPath: mobileOpen
            ? 'circle(200% at calc(100% - 36px) 36px)'
            : 'circle(0% at calc(100% - 36px) 36px)',
          transition: 'clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        {/* Top logo strip + close button */}
        <div className="px-6 pt-5 pb-4 border-b border-white/10 flex-shrink-0 flex items-center justify-between">
          <img src="/images/logo.webp" alt="GirlyTech" className="h-15 w-auto" />
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-6 py-8 space-y-1">
          {mainLinks.map((link) =>
            link.dropdown ? (
              /* Accordion for Get Involved */
              <div key={link.label}>
                <button
                  onClick={() => setMobileDrop((p) => !p)}
                  className="flex items-center justify-between w-full py-4 border-b border-white/8 group"
                >
                  <span className="flex items-center gap-4 text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-blue-400 transition-colors">
                    <link.icon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    {link.label}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-300 ${mobileDrop ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Sub-items */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: mobileDrop ? `${involved.length * 64}px` : '0px' }}
                >
                  <div className="pl-10 pt-2 pb-4 space-y-1">
                    {involved.map(({ label, to, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        className="flex items-center gap-3 py-2.5 text-lg text-white/60 hover:text-blue-400 transition-colors"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0 text-blue-500" />
                        {label}
                        <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-4 py-4 border-b border-white/8 text-2xl sm:text-3xl font-display font-bold text-white hover:text-blue-400 transition-colors group"
              >
                <link.icon className="w-6 h-6 text-blue-500 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 pb-10 pt-4 flex-shrink-0 space-y-3">
          <Link
            to="/donate"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base rounded-md shadow-lg shadow-blue-600/30"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </Link>
          <p className="text-center text-white/25 text-xs">© {new Date().getFullYear()} GirlyTech</p>
        </div>
      </div>
    </>
  )
}
