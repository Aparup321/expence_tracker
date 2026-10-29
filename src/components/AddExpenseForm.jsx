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
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="add-expense-title">
      <div className="modal-panel">
        <div className="modal-heading">
          <div><h2 id="add-expense-title">{isEditing ? 'Edit expense' : 'Add expense'}</h2><p>{isEditing ? 'Update this transaction' : 'Record a new transaction'}</p></div>
          <button type="button" onClick={onClose} aria-label="Close form" className="icon-button"><X size={20} /></button>
        </div>
        <form onSubmit={onSubmit} noValidate className="expense-form">
          <div>
            <label htmlFor="expense-title">Expense title</label>
            <input ref={titleInput} id="expense-title" name="title" value={values.title} onChange={onChange} placeholder="e.g. Grocery shopping" className="form-input" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'expense-title-error' : undefined} />
            {errors.title && <p id="expense-title-error" className="form-error">{errors.title}</p>}
          </div>
          <div className="form-grid">
            <div>
              <label htmlFor="expense-amount">Amount</label>
              <div className="amount-field"><span>Rs</span><input id="expense-amount" name="amount" type="number" min="0.01" step="0.01" value={values.amount} onChange={onChange} placeholder="0.00" className="form-input" aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'expense-amount-error' : undefined} /></div>
              {errors.amount && <p id="expense-amount-error" className="form-error">{errors.amount}</p>}
            </div>
            <div>
              <label htmlFor="expense-date">Date</label>
              <input id="expense-date" name="date" type="date" value={values.date} onChange={onChange} className="form-input" aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'expense-date-error' : undefined} />
              {errors.date && <p id="expense-date-error" className="form-error">{errors.date}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="expense-category">Category</label>
            <select id="expense-category" name="category" value={values.category} onChange={onChange} className="form-input" aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? 'expense-category-error' : undefined}>
              <option value="">Choose a category</option>{categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            {errors.category && <p id="expense-category-error" className="form-error">{errors.category}</p>}
          </div>
          <div>
            <label htmlFor="expense-description">Description <span>(optional)</span></label>
            <textarea id="expense-description" name="description" value={values.description} onChange={onChange} rows="3" placeholder="Add a note about this expense" className="form-input" />
          </div>
          <div className="form-actions"><button type="button" onClick={onClose} className="button button-quiet">Cancel</button><button type="submit" disabled={isSaving} className="button button-primary">{isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Save expense'}</button></div>
        </form>
      </div>
    </div>
  )
}
