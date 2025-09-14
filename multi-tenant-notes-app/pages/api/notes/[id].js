import { setCors, requireAuth } from '../_utils.js'
import { NOTES } from '../../../lib/store.js'

export default function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const auth = requireAuth(req, res)
  if (!auth) return
  const { tenant } = auth
  const id = req.query.id
  const note = NOTES.find(n => n.id === id && n.tenant === tenant.slug)
  if (!note) return res.status(404).json({ error: 'Not found' })

  if (req.method === 'GET') return res.json(note)

  if (req.method === 'PUT') {
    const { title, content } = req.body || {}
    if (title) note.title = String(title)
    if (content) note.content = String(content)
    note.updatedAt = new Date().toISOString()
    return res.json(note)
  }

  if (req.method === 'DELETE') {
    const idx = NOTES.findIndex(n => n.id === id && n.tenant === tenant.slug)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    NOTES.splice(idx, 1)
    return res.json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
