import { Plus, Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import SummaryCard from './components/SummaryCard'
import ExpenseList from './components/ExpenseList'
import { expenses } from './data/expenses'

const money = (amount) => `$${amount.toFixed(2)}`

export default function App() {
  const todayTotal = expenses.slice(0, 2).reduce((total, expense) => total + expense.amount, 0)
  const monthTotal = expenses.reduce((total, expense) => total + expense.amount, 0)
  return <div className="min-h-screen bg-[#f6f8f7] text-slate-900"><Navbar /><main id="dashboard" className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pt-12"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600"><Sparkles size={16} /> Good morning, Jamie</p><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your spending overview</h1><p className="mt-2 text-slate-500">Keep an eye on your daily spending and stay on track.</p></div><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-600"><Plus size={18} /> Add expense</button></div><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><SummaryCard label="Total expenses today" value={money(todayTotal)} detail="from 2 transactions" icon="wallet" trend={{ value: '12.5%', direction: 'down' }} /><SummaryCard label="Total expenses this month" value={money(monthTotal)} detail="vs. $480.00 last month" icon="calendar" trend={{ value: '8.2%', direction: 'up' }} /><SummaryCard label="Total transactions" value={expenses.length} detail="this month" icon="receipt" trend={{ value: '3', direction: 'up' }} /></section><div className="mt-8 max-w-4xl"><ExpenseList expenses={expenses} /></div></main></div>
}
