import { useEffect, useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import SummaryCard from './components/SummaryCard'
import ExpenseList from './components/ExpenseList'
import AddExpenseForm from './components/AddExpenseForm'
import { expenses as initialExpenses } from './data/expenses'

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others']
const STORAGE_KEY = 'spendwise-expenses'
const todayString = () => new Date().toISOString().slice(0, 10)
const blankForm = () => ({ title: '', amount: '', category: '', date: todayString(), description: '' })
const money = (amount) => `Rs ${amount.toFixed(2)}`

function loadExpenses() {
  try {
    if (typeof window === 'undefined') return initialExpenses
    const savedExpenses = window.localStorage.getItem(STORAGE_KEY)
    if (!savedExpenses) return initialExpenses
    const parsedExpenses = JSON.parse(savedExpenses)
    return isValidExpenses(parsedExpenses) ? parsedExpenses : initialExpenses
  } catch {
    return initialExpenses
  }
}

function isValidExpenses(value) {
  return Array.isArray(value) && value.every((expense) => (
    expense && typeof expense === 'object' && expense.id !== undefined &&
    typeof expense.name === 'string' && typeof expense.category === 'string' &&
    typeof expense.date === 'string' && typeof expense.amount === 'number' && Number.isFinite(expense.amount)
  ))
}

export default function App() {
  const [expenses, setExpenses] = useState(loadExpenses)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
    } catch {
      // Storage may be unavailable, but the in-memory app should continue working.
    }
  }, [expenses])

  const openForm = () => { setForm(blankForm()); setErrors({}); setEditingId(null); setIsFormOpen(true) }
  const openEditForm = (expense) => { setForm({ title: expense.name, amount: String(expense.amount), category: expense.category, date: toInputDate(expense.date), description: expense.description || '' }); setErrors({}); setEditingId(expense.id); setIsFormOpen(true) }
  const closeForm = () => { setIsFormOpen(false); setErrors({}); setEditingId(null) }
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
    const updatedExpense = { name: form.title.trim(), amount: Number(form.amount), category: form.category, date: form.date, description: form.description.trim() }
    if (editingId !== null) {
      setExpenses((current) => current.map((expense) => expense.id === editingId ? { ...expense, ...updatedExpense } : expense))
      setFeedback('Expense updated successfully.')
    } else {
      setExpenses((current) => [{ id: `${Date.now()}-${Math.random()}`, ...updatedExpense, icon: 'receipt' }, ...current])
    }
    closeForm()
  }
  const handleDelete = (expense) => {
    if (!window.confirm(`Delete “${expense.name}”?`)) return
    setExpenses((current) => current.filter((item) => item.id !== expense.id))
    setFeedback('Expense deleted successfully.')
  }

  const now = new Date()
  const sameDay = (date) => { const parsed = parseExpenseDate(date); return parsed.toDateString() === now.toDateString() }
  const sameMonth = (date) => { const parsed = parseExpenseDate(date); return parsed.getFullYear() === now.getFullYear() && parsed.getMonth() === now.getMonth() }
  const todayExpenses = expenses.filter((expense) => sameDay(expense.date))
  const monthExpenses = expenses.filter((expense) => sameMonth(expense.date))
  const todayTotal = todayExpenses.reduce((total, expense) => total + expense.amount, 0)
  const monthTotal = monthExpenses.reduce((total, expense) => total + expense.amount, 0)

  return <div className="min-h-screen bg-[#f6f8f7] text-slate-900"><Navbar /><main id="dashboard" className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pt-12"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600"><Sparkles size={16} /> Good morning, Jamie</p><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your spending overview</h1><p className="mt-2 text-slate-500">Keep an eye on your daily spending and stay on track.</p></div><button onClick={openForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-600"><Plus size={18} /> Add expense</button></div>{feedback && <div role="status" className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{feedback}</div>}<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><SummaryCard label="Total expenses today" value={money(todayTotal)} detail={`from ${todayExpenses.length} transactions`} icon="wallet" /><SummaryCard label="Total expenses this month" value={money(monthTotal)} detail={`from ${monthExpenses.length} transactions`} icon="calendar" /><SummaryCard label="Total transactions" value={expenses.length} detail="all recorded expenses" icon="receipt" /></section><div className="mt-8 max-w-4xl"><ExpenseList expenses={expenses} onEdit={openEditForm} onDelete={handleDelete} /></div></main>{isFormOpen && <AddExpenseForm values={form} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onClose={closeForm} isEditing={editingId !== null} />}</div>
}

function parseExpenseDate(date) {
  const today = new Date()
  if (date.startsWith('Today')) return today
  if (date.startsWith('Yesterday')) { today.setDate(today.getDate() - 1); return today }
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date)
}

function toInputDate(date) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  const parsed = parseExpenseDate(date)
  return Number.isNaN(parsed.getTime()) ? todayString() : parsed.toISOString().slice(0, 10)
}
