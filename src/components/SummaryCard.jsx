export default function SummaryCard({ label, value, detail, icon, trend }) {
  return (
    <article className="summary-item">
      <p className="summary-label">{label}</p>
      <p className="summary-value">{value}</p>
      <p className="summary-detail">{detail}</p>
    </article>
  )
}
