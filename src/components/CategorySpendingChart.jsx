import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f97316', '#f43f5e']

export default function CategorySpendingChart({ data }) {
  return <div className="min-h-[280px]">{data.length === 0 ? <EmptyChart message="No category spending for this period." /> : <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={data} dataKey="amount" nameKey="category" innerRadius={62} outerRadius={92} paddingAngle={3}>{data.map((entry, index) => <Cell key={entry.category} fill={colors[index % colors.length]} />)}</Pie><Tooltip formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Spent']} /><Legend formatter={(value, entry) => `${value}  ₹${entry.payload.amount.toFixed(2)} (${entry.payload.percentage}%)`} /></PieChart></ResponsiveContainer>}</div>
}

function EmptyChart({ message }) { return <div className="flex min-h-[280px] items-center justify-center text-center text-sm text-slate-500">{message}</div> }
