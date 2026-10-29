import { useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import SummaryCard from './components/SummaryCard'
import ExpenseList from './components/ExpenseList'
import AddExpenseForm from './components/AddExpenseForm'
import { expenses as initialExpenses } from './data/expenses'

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others']
const todayString = () => new Date().toISOString().slice(0, 10)
const blankForm = () => ({ title: '', amount: '', category: '', date: todayString(), description: '' })
const money = (amount) => `$${amount.toFixed(2)}`

export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})

  const openForm = () => { setForm(blankForm()); setErrors({}); setIsFormOpen(true) }
  const closeForm = () => { setIsFormOpen(false); setErrors({}) }
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const validate = () => {
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Please enter a title.'
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = 'Amount must be greater than zero.'
    if (!categories.includes(form.category)) nextErrors.category = 'Please choose a category.'
    if (!form.date) nextErrors.date = 'Please choose a date.'
    return nextErrors
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }
    setExpenses((current) => [{ id: `${Date.now()}-${Math.random()}`, name: form.title.trim(), amount: Number(form.amount), category: form.category, date: form.date, description: form.description.trim(), icon: 'receipt' }, ...current])
    closeForm()
  }

  const now = new Date()
  const sameDay = (date) => { const parsed = parseExpenseDate(date); return parsed.toDateString() === now.toDateString() }
  const sameMonth = (date) => { const parsed = parseExpenseDate(date); return parsed.getFullYear() === now.getFullYear() && parsed.getMonth() === now.getMonth() }
  const todayExpenses = expenses.filter((expense) => sameDay(expense.date))
  const monthExpenses = expenses.filter((expense) => sameMonth(expense.date))
  const todayTotal = todayExpenses.reduce((total, expense) => total + expense.amount, 0)
  const monthTotal = monthExpenses.reduce((total, expense) => total + expense.amount, 0)

  return <div className="min-h-screen bg-[#f6f8f7] text-slate-900"><Navbar /><main id="dashboard" className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pt-12"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600"><Sparkles size={16} /> Good morning, Jamie</p><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your spending overview</h1><p className="mt-2 text-slate-500">Keep an eye on your daily spending and stay on track.</p></div><button onClick={openForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-600"><Plus size={18} /> Add expense</button></div><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><SummaryCard label="Total expenses today" value={money(todayTotal)} detail={`from ${todayExpenses.length} transactions`} icon="wallet" /><SummaryCard label="Total expenses this month" value={money(monthTotal)} detail={`from ${monthExpenses.length} transactions`} icon="calendar" /><SummaryCard label="Total transactions" value={expenses.length} detail="all recorded expenses" icon="receipt" /></section><div className="mt-8 max-w-4xl"><ExpenseList expenses={expenses} /></div></main>{isFormOpen && <AddExpenseForm values={form} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onClose={closeForm} />}</div>
}

function parseExpenseDate(date) {
  const today = new Date()
  if (date.startsWith('Today')) return today
  if (date.startsWith('Yesterday')) { today.setDate(today.getDate() - 1); return today }
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date)
}
