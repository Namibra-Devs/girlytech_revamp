const variants = {
  pink:  'bg-pink-100 text-pink-700',
  navy:  'bg-navy-100 text-navy-800',
  blue:  'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  gray:  'bg-gray-100 text-gray-600',
}

export default function Badge({ children, variant = 'pink', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
