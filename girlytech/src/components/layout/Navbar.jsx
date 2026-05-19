import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, Cpu, Heart } from 'lucide-react'

const involved = [
  { label: 'Programs',        to: '/programs',    desc: 'Explore our STEM training programs' },
  { label: 'Volunteer',       to: '/volunteer',   desc: 'Give your time and skills' },
  { label: 'Become a Member', to: '/membership',  desc: 'Join the GirlyTech community' },
  { label: 'Partner With Us', to: '/partner',     desc: 'Corporate & org-level partnerships' },
]

const mainLinks = [
  { label: 'About Us',    to: '/about' },
  { label: 'Get Involved', dropdown: involved },
  { label: 'Events',      to: '/events' },
  { label: 'Gallery',     to: '/gallery' },
  { label: 'Blog',        to: '/blog' },
  { label: 'Contact Us',  to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen]   = useState(false)
  const dropRef  = useRef(null)
  const location = useLocation()
  const isHome   = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setDropOpen(false) }, [location])

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const solid = scrolled || !isHome
  const navBg  = solid ? 'bg-navy-950/95 backdrop-blur-md shadow-xl shadow-navy-950/30' : 'bg-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center shadow-md shadow-pink-600/40 group-hover:shadow-pink-600/60 transition-shadow">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">
              Girly<span className="text-pink-400">Tech</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((link) =>
              link.dropdown ? (
                <li key={link.label} ref={dropRef} className="relative">
                  <button
                    onClick={() => setDropOpen((p) => !p)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-all"
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-navy-950/25 border border-gray-100/80 overflow-hidden z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="group flex flex-col gap-0.5 px-5 py-3.5 hover:bg-navy-50 transition-colors border-b border-gray-50 last:border-0"
                        >
                          <span className="text-sm font-semibold text-navy-950 group-hover:text-pink-600 transition-colors">{item.label}</span>
                          <span className="text-xs text-gray-400">{item.desc}</span>
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
                      `px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        isActive ? 'text-white bg-white/15' : 'text-white/75 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
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
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-sm font-bold rounded-xl shadow-md shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-105 transition-all"
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 pt-2 pb-5 space-y-0.5">
            {mainLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <p className="px-4 pt-4 pb-1.5 text-[11px] font-bold text-pink-400 uppercase tracking-widest">
                    {link.label}
                  </p>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-2 px-7 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg mx-2 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center px-4 py-2.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/5 rounded-lg mx-2 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="px-4 pt-4">
              <Link
                to="/donate"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-sm font-bold rounded-xl"
              >
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
