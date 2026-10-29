import { Bell, CircleDollarSign, Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#dashboard" className="flex items-center gap-2.5 text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-200"><CircleDollarSign size={22} strokeWidth={2.4} /></span>
          <span className="text-xl font-bold tracking-tight">SpendWise</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          <a className="text-emerald-600" href="#dashboard">Dashboard</a>
          <a className="transition-colors hover:text-slate-900" href="#transactions">Transactions</a>
          <a className="transition-colors hover:text-slate-900" href="#reports">Reports</a>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 sm:block"><Bell size={19} /></button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">JD</div>
          <button aria-label="Open menu" className="rounded-lg p-2 text-slate-500 md:hidden"><Menu size={20} /></button>
        </div>
      </div>
    </header>
  )
}
