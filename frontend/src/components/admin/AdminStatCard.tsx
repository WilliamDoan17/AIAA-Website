type Props = {
  label: string
  value: number | string
}

const AdminStatCard = ({ label, value }: Props) => (
  <div className="bg-surface border border-rim rounded-2xl px-6 py-5 flex flex-col gap-1">
    <p className="font-body text-xs uppercase tracking-wide text-muted">{label}</p>
    <p className="kpi-value">{value}</p>
  </div>
)

export default AdminStatCard
