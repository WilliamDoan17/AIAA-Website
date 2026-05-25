import { useNavigate } from 'react-router-dom'

const LoginButton = () => {
  const navigate = useNavigate()

  const handleLogin = async () => {
    navigate('/login')
  }


  return (
    <button
      onClick={handleLogin}
      className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent border border-accent px-4 py-1.5 no-underline relative overflow-hidden [clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)] transition-colors duration-300 cta-btn"
    >
      Log In
    </button>
  )
}

export default LoginButton
