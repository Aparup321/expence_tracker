import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others']

export default function AddExpenseForm({ values, errors, onChange, onSubmit, onClose, isEditing, isSaving }) {
  const titleInput = useRef(null)

  useEffect(() => {
    titleInput.current?.focus()
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="add-expense-title">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div><h2 id="add-expense-title" className="font-bold text-slate-900">{isEditing ? 'Edit expense' : 'Add expense'}</h2><p className="mt-1 text-sm text-slate-500">{isEditing ? 'Update this transaction' : 'Record a new transaction'}</p></div>
          <button type="button" onClick={onClose} aria-label="Close form" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button>
        </div>
        <form onSubmit={onSubmit} noValidate className="space-y-4 px-6 py-5">
          <div>
            <label htmlFor="expense-title" className="mb-1.5 block text-sm font-medium text-slate-700">Expense title</label>
            <input ref={titleInput} id="expense-title" name="title" value={values.title} onChange={onChange} placeholder="e.g. Grocery shopping" className="form-input" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'expense-title-error' : undefined} />
            {errors.title && <p id="expense-title-error" className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="expense-amount" className="mb-1.5 block text-sm font-medium text-slate-700">Amount</label>
              <div className="relative"><span className="absolute left-3 top-2.5 text-sm text-slate-400">Rs</span><input id="expense-amount" name="amount" type="number" min="0.01" step="0.01" value={values.amount} onChange={onChange} placeholder="0.00" className="form-input pl-9" aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'expense-amount-error' : undefined} /></div>
              {errors.amount && <p id="expense-amount-error" className="mt-1 text-xs text-red-600">{errors.amount}</p>}
            </div>
            <div>
              <label htmlFor="expense-date" className="mb-1.5 block text-sm font-medium text-slate-700">Date</label>
              <input id="expense-date" name="date" type="date" value={values.date} onChange={onChange} className="form-input" aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'expense-date-error' : undefined} />
              {errors.date && <p id="expense-date-error" className="mt-1 text-xs text-red-600">{errors.date}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="expense-category" className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
            <select id="expense-category" name="category" value={values.category} onChange={onChange} className="form-input" aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? 'expense-category-error' : undefined}>
              <option value="">Choose a category</option>{categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            {errors.category && <p id="expense-category-error" className="mt-1 text-xs text-red-600">{errors.category}</p>}
          </div>
          <div>
            <label htmlFor="expense-description" className="mb-1.5 block text-sm font-medium text-slate-700">Description <span className="font-normal text-slate-400">(optional)</span></label>
            <textarea id="expense-description" name="description" value={values.description} onChange={onChange} rows="3" placeholder="Add a note about this expense" className="form-input resize-none" />
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button type="submit" disabled={isSaving} className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Save expense'}</button></div>
        </form>
      </div>
    </div>
  )
}
