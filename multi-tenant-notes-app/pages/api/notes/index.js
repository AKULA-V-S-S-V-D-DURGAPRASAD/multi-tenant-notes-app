import { setCors, requireAuth } from '../_utils.js'
import { NOTES, TENANTS } from '../../../lib/store.js'
import { nanoid } from 'nanoid'

export default function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const auth = requireAuth(req, res)
  if (!auth) return
  const { user, tenant } = auth

  if (req.method === 'GET') {
    const notes = NOTES.filter(n => n.tenant === tenant.slug)
    return res.json(notes)
  }

  if (req.method === 'POST') {
    try {
      const { title, content } = req.body || {}
      if (!title) return res.status(400).json({ error: 'title required' })
      const t = TENANTS.find(tt => tt.slug === tenant.slug)
      if (!t) return res.status(404).json({ error: 'Tenant not found' })
      if (t.plan === 'free') {
        const count = NOTES.filter(n => n.tenant === tenant.slug).length
        if (count >= 3) return res.status(403).json({ error: 'Free plan limit reached' })
      }
      const note = { id: nanoid(), title, content, tenant: tenant.slug, createdBy: user.email, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      NOTES.push(note)
      return res.status(201).json(note)
    } catch (err) {
      console.error('CREATE NOTE ERROR', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
