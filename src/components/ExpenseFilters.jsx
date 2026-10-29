import { Search, SlidersHorizontal, X } from 'lucide-react'

const categories = ['All Categories', 'Food', 'Transport', 'Shopping', 'Bills', 'Others']

export default function ExpenseFilters({ filters, onChange, onClear, hasActiveFilters }) {
  return (
    <div className="filter-panel">
      <div className="filter-heading"><SlidersHorizontal size={16} /> Find a transaction</div>
      <div className="filter-grid">
        <label className="search-field"><span className="sr-only">Search expenses</span><Search size={17} /><input value={filters.search} onChange={(event) => onChange('search', event.target.value)} placeholder="Search by title or description" /></label>
        <label><span className="sr-only">Filter by category</span><select value={filters.category} onChange={(event) => onChange('category', event.target.value)} className="form-input"><option value="">All categories</option>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select></label>
        <label><span className="sr-only">Filter by date</span><select value={filters.dateFilter} onChange={(event) => onChange('dateFilter', event.target.value)} className="form-input"><option value="all">All time</option><option value="today">Today</option><option value="month">This month</option><option value="custom">Custom date range</option></select></label>
        <label><span className="sr-only">Sort expenses</span><select value={filters.sort} onChange={(event) => onChange('sort', event.target.value)} className="form-input"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="highest">Highest amount</option><option value="lowest">Lowest amount</option></select></label>
      </div>
      {filters.dateFilter === 'custom' && <div className="date-range"><label><span>Start date</span><input type="date" value={filters.startDate} onChange={(event) => onChange('startDate', event.target.value)} className="form-input" /></label><label><span>End date</span><input type="date" value={filters.endDate} onChange={(event) => onChange('endDate', event.target.value)} className="form-input" /></label></div>}
      {hasActiveFilters && <button type="button" onClick={onClear} className="clear-button"><X size={15} /> Clear filters</button>}
    </div>
  )
}
