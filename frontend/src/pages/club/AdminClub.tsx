import { useClubInfo, useUpdateClubInfo } from '../../hooks/club'
import ClubForm from '../../components/club/ClubForm'

const AdminClub = () => {
  const { data: clubInfo, isLoading } = useClubInfo()
  const { mutate: save, isPending: saving, isSuccess: saved, error: saveError } = useUpdateClubInfo()

  if (isLoading) return (
    <p className="text-muted font-body text-sm">Loading...</p>
  )

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-semibold tracking-wide text-copy section-underline mb-8">
        Club Info
      </h1>
      <ClubForm
        clubInfo={clubInfo!}
        onSave={save}
        saving={saving}
        saved={saved}
        saveError={saveError}
      />
    </div>
  )
}

export default AdminClub
