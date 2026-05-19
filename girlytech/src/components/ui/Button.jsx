import { Link } from 'react-router-dom'

const variants = {
  primary:      'bg-navy-950 hover:bg-navy-900 text-white shadow-lg shadow-navy-950/20 hover:shadow-navy-950/40',
  secondary:    'bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50',
  outline:      'border-2 border-white text-white hover:bg-white hover:text-navy-950',
  'outline-dark': 'border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white',
  ghost:        'text-navy-950 hover:bg-navy-50',
  white:        'bg-white text-navy-950 hover:bg-pink-50 shadow-lg shadow-black/10',
}

const sizes = {
  sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-sm rounded-xl gap-2',
  xl: 'px-9 py-4.5 text-base rounded-2xl gap-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  icon,
  iconRight,
  disabled,
  ...props
}) {
  const base = `inline-flex items-center justify-center font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none`
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) return <Link to={to} className={cls} {...props}>{icon}{children}{iconRight}</Link>
  if (href) return <a href={href} className={cls} {...props}>{icon}{children}{iconRight}</a>
  return <button className={cls} disabled={disabled} {...props}>{icon}{children}{iconRight}</button>
}
