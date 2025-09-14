import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setErr(null)
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) return setErr(data.error || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/notes')
    } catch (e) {
      setErr('Network error')
    }
  }

  function quickFill(a){ setEmail(a); setPassword('password') }

  return (
    <div style={{maxWidth:540,margin:'48px auto',padding:18}}>
      <h1>Notes App — Login</h1>
      <div style={{marginBottom:12}}>
        <button onClick={() => quickFill('admin@acme.test')}>admin@acme.test</button>{' '}
        <button onClick={() => quickFill('user@acme.test')}>user@acme.test</button>{' '}
        <button onClick={() => quickFill('admin@globex.test')}>admin@globex.test</button>{' '}
        <button onClick={() => quickFill('user@globex.test')}>user@globex.test</button>
      </div>
      <form onSubmit={submit}>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" /></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" /></div>
        {err && <div style={{color:'red'}}>{err}</div>}
        <div><button type="submit">Login</button></div>
      </form>
    </div>
  )
}
