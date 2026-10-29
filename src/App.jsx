import { useEffect, useMemo, useRef, useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import SummaryCard from './components/SummaryCard'
import ExpenseList from './components/ExpenseList'
import ExpenseFilters from './components/ExpenseFilters'
import AddExpenseForm from './components/AddExpenseForm'
import AnalyticsSection from './components/AnalyticsSection'
import { expenses as initialExpenses } from './data/expenses'

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others']
const STORAGE_KEY = 'spendwise-expenses'
const todayString = () => new Date().toISOString().slice(0, 10)
const blankForm = () => ({ title: '', amount: '', category: '', date: todayString(), description: '' })
const defaultFilters = () => ({ search: '', category: '', dateFilter: 'all', startDate: '', endDate: '', sort: 'newest' })
const defaultReport = () => ({ period: 'all', startDate: '', endDate: '' })
const money = (amount) => `Rs ${amount.toFixed(2)}`

function loadExpenses() {
  try { if (typeof window === 'undefined') return initialExpenses; const saved = window.localStorage.getItem(STORAGE_KEY); if (!saved) return initialExpenses; const parsed = JSON.parse(saved); return isValidExpenses(parsed) ? parsed : initialExpenses } catch { return initialExpenses }
}
function isValidExpenses(value) { return Array.isArray(value) && value.every((expense) => expense && typeof expense === 'object' && expense.id !== undefined && typeof expense.name === 'string' && typeof expense.category === 'string' && typeof expense.date === 'string' && typeof expense.amount === 'number' && Number.isFinite(expense.amount)) }

export default function App() {
  const [expenses, setExpenses] = useState(loadExpenses)
  const [filters, setFilters] = useState(defaultFilters)
  const [report, setReport] = useState(defaultReport)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const submitLock = useRef(false)

  useEffect(() => { try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)) } catch { /* Keep in-memory data if storage is unavailable. */ } }, [expenses])
  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))
  const updateReport = (name, value) => setReport((current) => ({ ...current, [name]: value }))
  const clearFilters = () => setFilters(defaultFilters())
  const hasActiveFilters = filters.search || filters.category || filters.dateFilter !== 'all' || filters.sort !== 'newest'

  const displayedExpenses = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    const filtered = expenses.filter((expense) => (!search || expense.name.toLowerCase().includes(search) || (expense.description || '').toLowerCase().includes(search)) && (!filters.category || expense.category === filters.category) && matchesDateFilter(expense.date, filters))
    return [...filtered].sort((first, second) => sortExpenses(first, second, filters.sort))
  }, [expenses, filters])
  const reportExpenses = useMemo(() => expenses.filter((expense) => matchesReportPeriod(expense.date, report)), [expenses, report])
  const categoryData = useMemo(() => buildCategoryData(reportExpenses), [reportExpenses])
  const monthlyData = useMemo(() => buildMonthlyData(reportExpenses), [reportExpenses])
  const analyticsSummary = useMemo(() => buildAnalyticsSummary(reportExpenses), [reportExpenses])

  const openForm = () => { setForm(blankForm()); setErrors({}); setEditingId(null); setIsFormOpen(true) }
  const openEditForm = (expense) => { setForm({ title: expense.name, amount: String(expense.amount), category: expense.category, date: toInputDate(expense.date), description: expense.description || '' }); setErrors({}); setEditingId(expense.id); setIsFormOpen(true) }
  const closeForm = () => { setIsFormOpen(false); setErrors({}); setEditingId(null) }
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const handleSubmit = (event) => {
    event.preventDefault(); if (submitLock.current) return; const nextErrors = validate(form); if (Object.keys(nextErrors).length) { setErrors(nextErrors); return }
    submitLock.current = true; setIsSaving(true)
    const updated = { name: form.title.trim(), amount: Number(form.amount), category: form.category, date: form.date, description: form.description.trim() }
    if (editingId !== null) { setExpenses((current) => current.map((expense) => expense.id === editingId ? { ...expense, ...updated } : expense)); setFeedback('Expense updated successfully.') } else setExpenses((current) => [{ id: `${Date.now()}-${Math.random()}`, ...updated, icon: 'receipt' }, ...current])
    if (editingId === null) setFeedback('Expense added successfully.')
    window.setTimeout(() => { submitLock.current = false; setIsSaving(false) }, 250)
    closeForm()
  }
  const handleDelete = (expense) => { if (!window.confirm(`Delete “${expense.name}”?`)) return; setExpenses((current) => current.filter((item) => item.id !== expense.id)); setFeedback('Expense deleted successfully.') }

  const today = new Date(); const todayExpenses = expenses.filter((expense) => sameDay(expense.date, today)); const monthExpenses = expenses.filter((expense) => sameMonth(expense.date, today)); const todayTotal = todayExpenses.reduce((total, expense) => total + expense.amount, 0); const monthTotal = monthExpenses.reduce((total, expense) => total + expense.amount, 0)
  return <div className="min-h-screen bg-[#f6f8f7] text-slate-900"><Navbar /><main id="dashboard" className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pt-12"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600"><Sparkles size={16} /> Good morning, Jamie</p><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your spending overview</h1><p className="mt-2 text-slate-500">Keep an eye on your daily spending and stay on track.</p></div><button onClick={openForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-200 hover:bg-emerald-600"><Plus size={18} /> Add expense</button></div>{feedback && <div role="status" className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{feedback}</div>}<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><SummaryCard label="Total expenses today" value={money(todayTotal)} detail={`from ${todayExpenses.length} transactions`} icon="wallet" /><SummaryCard label="Total expenses this month" value={money(monthTotal)} detail={`from ${monthExpenses.length} transactions`} icon="calendar" /><SummaryCard label="Total transactions" value={expenses.length} detail="all recorded expenses" icon="receipt" /></section><AnalyticsSection report={report} onReportChange={updateReport} categoryData={categoryData} monthlyData={monthlyData} summary={analyticsSummary} /><div className="mt-8 max-w-4xl"><ExpenseFilters filters={filters} onChange={updateFilter} onClear={clearFilters} hasActiveFilters={hasActiveFilters} /><ExpenseList expenses={displayedExpenses} hasExpenses={expenses.length > 0} onEdit={openEditForm} onDelete={handleDelete} /></div></main>{isFormOpen && <AddExpenseForm values={form} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onClose={closeForm} isEditing={editingId !== null} isSaving={isSaving} />}</div>
}

function validate(form) { const errors = {}; const amount = Number(form.amount); const dateIsValid = /^\d{4}-\d{2}-\d{2}$/.test(form.date) && !Number.isNaN(new Date(`${form.date}T00:00:00`).getTime()); if (!form.title.trim()) errors.title = 'Please enter a title.'; if (!form.amount || !Number.isFinite(amount) || amount <= 0) errors.amount = 'Enter a valid amount greater than zero.'; if (!categories.includes(form.category)) errors.category = 'Please choose a category.'; if (!dateIsValid) errors.date = 'Please choose a valid date.'; return errors }
function parseExpenseDate(date) { const today = new Date(); if (date.startsWith('Today')) return today; if (date.startsWith('Yesterday')) { today.setDate(today.getDate() - 1); return today } return /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date) }
function dateKey(date) { const parsed = parseExpenseDate(date); return Number.isNaN(parsed.getTime()) ? '' : `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}` }
function sameDay(date, reference) { return parseExpenseDate(date).toDateString() === reference.toDateString() }
function sameMonth(date, reference) { const parsed = parseExpenseDate(date); return parsed.getFullYear() === reference.getFullYear() && parsed.getMonth() === reference.getMonth() }
function matchesDateFilter(date, filters) { if (filters.dateFilter === 'today') return sameDay(date, new Date()); if (filters.dateFilter === 'month') return sameMonth(date, new Date()); if (filters.dateFilter === 'custom') { const key = dateKey(date); return (!filters.startDate || key >= filters.startDate) && (!filters.endDate || key <= filters.endDate) } return true }
function matchesReportPeriod(date, report) { if (report.period === 'today') return sameDay(date, new Date()); if (report.period === 'month') return sameMonth(date, new Date()); if (report.period === 'custom') { const key = dateKey(date); return (!report.startDate || key >= report.startDate) && (!report.endDate || key <= report.endDate) } return true }
function sortExpenses(first, second, sort) { if (sort === 'highest' || sort === 'lowest') return sort === 'highest' ? second.amount - first.amount : first.amount - second.amount; const difference = new Date(dateKey(second.date)) - new Date(dateKey(first.date)); return sort === 'oldest' ? -difference : difference }
function toInputDate(date) { if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date; const parsed = parseExpenseDate(date); return Number.isNaN(parsed.getTime()) ? todayString() : parsed.toISOString().slice(0, 10) }

function buildCategoryData(expenses) { const total = expenses.reduce((sum, expense) => sum + expense.amount, 0); return categories.map((category) => ({ category, amount: expenses.filter((expense) => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0) })).filter((entry) => entry.amount > 0).map((entry) => ({ ...entry, percentage: total ? ((entry.amount / total) * 100).toFixed(1) : '0.0' })) }
function buildMonthlyData(expenses) { const now = new Date(); return Array.from({ length: 6 }, (_, index) => { const month = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1); const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`; return { key, label: month.toLocaleDateString('en-US', { month: 'short' }), amount: expenses.filter((expense) => dateKey(expense.date).startsWith(key)).reduce((sum, expense) => sum + expense.amount, 0) } }) }
function buildAnalyticsSummary(expenses) { const total = expenses.reduce((sum, expense) => sum + expense.amount, 0); const byCategory = buildCategoryData(expenses); const highest = byCategory.reduce((winner, entry) => !winner || entry.amount > winner.amount ? entry : winner, null); const now = new Date(); const currentMonth = expenses.filter((expense) => sameMonth(expense.date, now)); const currentMonthTotal = currentMonth.reduce((sum, expense) => sum + expense.amount, 0); return { total, highestCategory: highest ? highest.category : '—', averageDaily: currentMonthTotal / now.getDate() } }
