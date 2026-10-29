import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function MonthlySpendingChart({ data }) {
  return <div className="min-h-[280px]">{data.length === 0 ? <div className="flex min-h-[280px] items-center justify-center text-sm text-slate-500">No monthly spending for this period.</div> : <ResponsiveContainer width="100%" height={280}><BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(value) => `₹${value}`} /><Tooltip cursor={{ fill: '#f1f5f9' }} formatter={(value) => [`₹${Number(value).toFixed(2)}`, 'Spent']} /><Bar dataKey="amount" fill="#10b981" radius={[5, 5, 0, 0]} maxBarSize={42} /></BarChart></ResponsiveContainer>}</div>
}
