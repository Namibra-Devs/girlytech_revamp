import { useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

export default function Toast({ show, message, onClose }) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [show, onClose])

  return (
    <div
      style={{
        transform: show ? 'translateY(0)' : 'translateY(120%)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
      }}
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-navy-950 text-white px-5 py-4 rounded-2xl shadow-2xl shadow-navy-950/40 border border-white/10 transition-all duration-300"
    >
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="w-5 h-5 text-emerald-400" />
      </div>
      <p className="text-sm font-medium pr-2">{message}</p>
      <button onClick={onClose} className="text-white/40 hover:text-white transition-colors flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
