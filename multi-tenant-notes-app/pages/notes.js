import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function authFetch(url, opts = {}) {
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return fetch(url, { ...opts, headers })
}

export default function NotesPage() {
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{ const u = localStorage.getItem('user'); if(!u) return router.push('/'); setUser(JSON.parse(u)); load() },[])

  async function load() {
    const r = await authFetch('/api/notes'); if(!r.ok){ if(r.status===401) return router.push('/'); const b = await r.json(); setError(b.error||'Failed'); return } const d = await r.json(); setNotes(d)
  }

  async function create(e){ e&&e.preventDefault(); setError(null); const r = await authFetch('/api/notes',{method:'POST', body: JSON.stringify({title,content})}); const b = await r.json(); if(!r.ok) return setError(b.error||'Failed'); setNotes(prev=>[b,...prev]); setTitle(''); setContent('') }

  async function del(id){ if(!confirm('Delete?')) return; const r = await authFetch('/api/notes/'+id,{method:'DELETE'}); if(!r.ok){ const b=await r.json(); return setError(b.error||'Failed'); } setNotes(prev=>prev.filter(n=>n.id!==id)) }

  async function upgrade(){ if(user.role!=='admin') return alert('Only admins'); const r = await authFetch(`/api/tenants/${user.tenant}/upgrade`,{method:'POST'}); const b=await r.json(); if(!r.ok) return alert(b.error||'Upgrade failed'); alert('Upgraded'); load() }

  return (
    <div style={{maxWidth:980,margin:24}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>{user?.email} — {user?.tenant} — {user?.role}</div>
        <div>
          {user?.role==='admin' && <button onClick={upgrade}>Upgrade to Pro</button>}
          <button onClick={()=>{localStorage.removeItem('token'); localStorage.removeItem('user'); router.push('/')}}>Logout</button>
        </div>
      </div>

      <section style={{marginTop:12}}>
        <form onSubmit={create}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" />
          <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="content" />
          <div><button type="submit">Create</button></div>
        </form>
      </section>

      <section style={{marginTop:18}}>
        {error && <div style={{color:'red'}}>{error}</div>}
        {notes.length===0 ? <div>No notes</div> : notes.map(n=> (
          <div key={n.id} style={{border:'1px solid #ddd',padding:8,marginBottom:8}}>
            <strong>{n.title}</strong>
            <div>{n.content}</div>
            <div><button onClick={()=>del(n.id)}>Delete</button></div>
          </div>
        ))}
      </section>
    </div>
  )
}
