import { Car, CircleParking, Coffee, Pencil, Receipt, ShoppingBag, ShoppingBasket, Trash2 } from 'lucide-react'

const categoryStyles = { Food: 'category-food', Transport: 'category-transport', Shopping: 'category-shopping', Bills: 'category-bills', Others: 'category-others' }
const expenseIcons = { car: Car, coffee: Coffee, receipt: Receipt, 'shopping-bag': ShoppingBag, 'shopping-basket': ShoppingBasket, 'circle-parking': CircleParking }

export default function ExpenseList({ expenses, hasExpenses, onEdit, onDelete }) {
  return (
    <section id="transactions" className="transaction-list">
      <div className="section-heading"><div><h2>Recent transactions</h2><p>Your latest spending activity</p></div><span className="list-count">{expenses.length} shown</span></div>
      {expenses.length === 0 ? <div className="empty-state"><p>{hasExpenses ? 'No expenses match your filters.' : 'No expenses yet.'}</p><span>{hasExpenses ? 'Try adjusting your search or date range.' : 'Add your first expense to start tracking your spending.'}</span></div> : <div className="transaction-rows">{expenses.map((expense) => { const Icon = expenseIcons[expense.icon] || Receipt; return <div key={expense.id} className="transaction-row"><span className={`category-icon ${categoryStyles[expense.category]}`}><Icon size={18} /></span><div className="transaction-copy"><p>{expense.name}</p><div><span className={`category-tag ${categoryStyles[expense.category]}`}>{expense.category}</span><span>{formatDate(expense.date)}</span></div></div><p className="transaction-amount">-Rs {expense.amount.toFixed(2)}</p><div className="row-actions"><button type="button" onClick={() => onEdit(expense)} aria-label={`Edit ${expense.name}`} className="icon-button"><Pencil size={16} /></button><button type="button" onClick={() => onDelete(expense)} aria-label={`Delete ${expense.name}`} className="icon-button danger-button"><Trash2 size={16} /></button></div></div> })}</div>}
    </section>
  )
}

function formatDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
