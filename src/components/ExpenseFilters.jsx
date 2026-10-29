import { Search, SlidersHorizontal, X } from 'lucide-react'

const categories = ['All Categories', 'Food', 'Transport', 'Shopping', 'Bills', 'Others']

export default function ExpenseFilters({ filters, onChange, onClear, hasActiveFilters }) {
  return (
    <div className="mb-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/50">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800"><SlidersHorizontal size={17} className="text-emerald-600" /> Find transactions</div>
      <div className="grid gap-3 lg:grid-cols-[minmax(200px,1.5fr)_repeat(3,minmax(145px,1fr))]">
        <label className="relative block"><span className="sr-only">Search expenses</span><Search size={17} className="pointer-events-none absolute left-3 top-3 text-slate-400" /><input value={filters.search} onChange={(event) => onChange('search', event.target.value)} placeholder="Search by title or description" className="form-input pl-9" /></label>
        <label><span className="sr-only">Filter by category</span><select value={filters.category} onChange={(event) => onChange('category', event.target.value)} className="form-input"><option value="">All Categories</option>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select></label>
        <label><span className="sr-only">Filter by date</span><select value={filters.dateFilter} onChange={(event) => onChange('dateFilter', event.target.value)} className="form-input"><option value="all">All Time</option><option value="today">Today</option><option value="month">This Month</option><option value="custom">Custom Date Range</option></select></label>
        <label><span className="sr-only">Sort expenses</span><select value={filters.sort} onChange={(event) => onChange('sort', event.target.value)} className="form-input"><option value="newest">Newest First</option><option value="oldest">Oldest First</option><option value="highest">Highest Amount</option><option value="lowest">Lowest Amount</option></select></label>
      </div>
      {filters.dateFilter === 'custom' && <div className="mt-3 grid gap-3 sm:grid-cols-2"><label><span className="mb-1 block text-xs font-medium text-slate-500">Start date</span><input type="date" value={filters.startDate} onChange={(event) => onChange('startDate', event.target.value)} className="form-input" /></label><label><span className="mb-1 block text-xs font-medium text-slate-500">End date</span><input type="date" value={filters.endDate} onChange={(event) => onChange('endDate', event.target.value)} className="form-input" /></label></div>}
      {hasActiveFilters && <button type="button" onClick={onClear} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"><X size={15} /> Clear filters</button>}
    </div>
  )
}
