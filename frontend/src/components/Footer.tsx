const Footer = () => {
  return (
    <div className="relative z-[1] py-16 px-10 border-t border-rim flex flex-col items-center bg-void text-center gap-4 overflow-hidden footer-wrap">
      <h1 className="font-display text-[clamp(0.7rem,1.5vw,0.95rem)] font-bold uppercase tracking-[0.12em] text-copy m-0">
        American Institute of Aeronautics and Astronautics at USF
      </h1>
      <h3 className="font-body text-[0.9rem] font-light tracking-[0.08em] text-muted m-0 leading-[1.8]">
        4202 E Fowler Ave<br />Tampa FL, 33620
      </h3>
    </div>
  )
}

export default Footer
