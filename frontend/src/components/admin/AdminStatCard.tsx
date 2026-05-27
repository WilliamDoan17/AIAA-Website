type Props = {
  label: string
  value: number | string
}

const AdminStatCard = ({ label, value }: Props) => (
  <div className="bg-surface border border-rim rounded px-6 py-5 flex flex-col gap-1">
    <p className="font-display text-[0.6rem] uppercase tracking-widest text-muted">{label}</p>
    <p className="font-display text-2xl font-bold text-copy">{value}</p>
  </div>
)

export default AdminStatCard
