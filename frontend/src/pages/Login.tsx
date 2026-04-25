import { login } from "../services/auth"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const { user, loading: userLoading
  } = useAuth()
  if (userLoading) return null
  if (user) return <Navigate to="/u/" />

  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    login(email, password)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return (
    <div className="bg-void text-copy font-body min-h-screen flex items-center justify-center px-4 relative starfield">
      <div className="w-full max-w-md fade-up">
        <div className="text-center mb-10">
          <span className="font-display text-[0.65rem] tracking-[0.35em] text-accent uppercase block mb-4">
            // Member Portal
          </span>
          <h1 className="font-display text-[clamp(1.4rem,4vw,2rem)] font-black uppercase tracking-[0.06em] leading-tight heading-gradient">
            Log In
          </h1>
        </div>

        <div className="bg-panel border border-rim p-8 relative card-accent">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-surface border border-rim text-copy font-body text-sm px-4 py-3 outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_1px_rgba(0,200,255,0.2)] placeholder:text-muted/40"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="bg-surface border border-rim text-copy font-body text-sm px-4 py-3 outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_1px_rgba(0,200,255,0.2)] placeholder:text-muted/40"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-[0.8rem] text-[#ff6b6b] border border-[rgba(255,107,107,0.3)] bg-[rgba(255,107,107,0.05)] px-4 py-2.5">
                {error.message ?? 'Login failed. Please try again.'}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="font-display text-xs font-bold uppercase tracking-[0.2em] py-4 px-8 mt-1 bg-transparent text-accent border border-accent cursor-pointer relative overflow-hidden [clip-path:polygon(10px_0%,100%_0%,calc(100%-10px)_100%,0%_100%)] transition-colors duration-300 cta-btn disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
