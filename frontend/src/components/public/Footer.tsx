import { useClubInfo } from '../../hooks/club'

const Footer = () => {
  const { data: clubInfo } = useClubInfo()

  return (
    <div className="py-12 px-10 border-t border-rim flex flex-col items-center bg-void text-center gap-3">
      <h1 className="font-display text-sm font-semibold uppercase tracking-wide text-copy m-0">
        {clubInfo?.name ?? ''}
      </h1>
      <p className="font-body text-sm text-muted m-0">
        4202 E Fowler Ave · Tampa FL, 33620
      </p>
    </div>
  )
}

export default Footer
