import { ArrowDownRight, ArrowUpRight, CalendarDays, ReceiptText, Wallet } from 'lucide-react'

const icons = { wallet: Wallet, calendar: CalendarDays, receipt: ReceiptText }

export default function SummaryCard({ label, value, detail, icon, trend }) {
  const Icon = icons[icon]
  const positive = trend?.direction === 'up'
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/50">
      <div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Icon size={20} /></span></div>
      <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">{trend && <span className={`inline-flex items-center gap-0.5 font-semibold ${positive ? 'text-emerald-600' : 'text-orange-500'}`}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{trend.value}</span>}<span>{detail}</span></div>
    </article>
  )
}
