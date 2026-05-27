import type { Member } from '../../types/members'

type Props = { president: Member }

const PresidentCard = ({ president }: Props) => (
  <div className="relative z-[1] flex flex-col md:flex-row items-stretch max-w-[1300px] mx-auto mt-12 px-6 md:px-16 gap-6 md:gap-12 group">
    <div className="relative w-full md:w-80 aspect-[3/4] flex-shrink-0 overflow-hidden border border-[rgba(240,165,0,0.3)] md:ml-4">
      {president.photo
        ? <img className="w-full h-full object-cover block [filter:brightness(0.85)_saturate(0.7)] transition-[filter] duration-300 group-hover:[filter:brightness(1)_saturate(1)]" src={president.photo} alt={president.name} />
        : <div className="w-full h-full bg-rim" />
      }
    </div>
    <div className="flex flex-col justify-start pt-0 md:pt-4 pb-4">
      <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black uppercase tracking-[0.06em] text-copy mb-3 leading-[1.1]">
        {president.name}
      </h3>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold m-0">
        PRESIDENT
      </p>
    </div>
  </div>
)

export default PresidentCard
