import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function MonthlySpendingChart({ data }) {
  return <div className="chart-frame">{data.length === 0 ? <div className="chart-empty">No monthly spending for this period.</div> : <ResponsiveContainer width="100%" height={280}><BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}><CartesianGrid vertical={false} stroke="var(--color-rule)" strokeDasharray="3 3" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted)', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-faint)', fontSize: 11 }} tickFormatter={(value) => `Rs ${value}`} /><Tooltip cursor={{ fill: 'var(--color-paper-3)' }} formatter={(value) => [`Rs ${Number(value).toFixed(2)}`, 'Spent']} /><Bar dataKey="amount" fill="var(--color-accent)" radius={[5, 5, 0, 0]} maxBarSize={42} /></BarChart></ResponsiveContainer>}</div>
}
