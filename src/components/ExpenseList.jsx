import { Car, CircleParking, Coffee, Pencil, Receipt, ShoppingBag, ShoppingBasket, Trash2 } from 'lucide-react'

const categoryStyles = { Food: 'bg-orange-50 text-orange-600', Transport: 'bg-blue-50 text-blue-600', Shopping: 'bg-violet-50 text-violet-600', Bills: 'bg-rose-50 text-rose-600', Others: 'bg-slate-100 text-slate-600' }
const expenseIcons = { car: Car, coffee: Coffee, receipt: Receipt, 'shopping-bag': ShoppingBag, 'shopping-basket': ShoppingBasket, 'circle-parking': CircleParking }

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <section id="transactions" className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6"><div><h2 className="font-bold text-slate-900">Recent transactions</h2><p className="mt-1 text-sm text-slate-500">Your latest spending activity</p></div><button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">View all</button></div>
      <div className="divide-y divide-slate-100">{expenses.map((expense) => { const Icon = expenseIcons[expense.icon] || Receipt; return <div key={expense.id} className="flex items-center gap-3 px-5 py-4 sm:gap-4"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${categoryStyles[expense.category]}`}><Icon size={19} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{expense.name}</p><div className="mt-1 flex items-center gap-2 text-xs text-slate-400"><span className={`rounded-md px-1.5 py-0.5 font-medium ${categoryStyles[expense.category]}`}>{expense.category}</span><span>{formatDate(expense.date)}</span></div></div><p className="shrink-0 text-sm font-bold text-slate-800">-Rs {expense.amount.toFixed(2)}</p><div className="flex shrink-0 items-center gap-1"><button type="button" onClick={() => onEdit(expense)} aria-label={`Edit ${expense.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"><Pencil size={16} /></button><button type="button" onClick={() => onDelete(expense)} aria-label={`Delete ${expense.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div></div> })}</div>
    </section>
  )
}

function formatDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
