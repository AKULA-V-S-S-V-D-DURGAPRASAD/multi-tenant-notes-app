import { getUserByEmail, signUser } from '../../../lib/auth.js'
import { setCors } from '../_utils.js'

export default function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })
    const user = getUserByEmail(email)
    if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' })
    const token = signUser(user)
    res.json({ token, user: { email: user.email, role: user.role, tenant: user.tenant } })
  } catch (err) {
    console.error('LOGIN ERROR', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
