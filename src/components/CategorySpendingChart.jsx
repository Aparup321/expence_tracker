import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const colors = ['var(--color-accent)', 'var(--color-chart-two)', 'var(--color-chart-three)', 'var(--color-chart-four)', 'var(--color-chart-five)']

export default function CategorySpendingChart({ data }) {
  return <div className="chart-frame">{data.length === 0 ? <EmptyChart message="No category spending for this period." /> : <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={data} dataKey="amount" nameKey="category" innerRadius={62} outerRadius={92} paddingAngle={3}>{data.map((entry, index) => <Cell key={entry.category} fill={colors[index % colors.length]} />)}</Pie><Tooltip formatter={(value) => [`Rs ${Number(value).toFixed(2)}`, 'Spent']} /><Legend formatter={(value, entry) => `${value}  Rs ${entry.payload.amount.toFixed(2)} (${entry.payload.percentage}%)`} /></PieChart></ResponsiveContainer>}</div>
}

function EmptyChart({ message }) { return <div className="chart-empty">{message}</div> }
