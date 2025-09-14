import { setCors, requireAuth } from '../../_utils.js'
import { upsertTenantPlan } from '../../../../lib/store.js'

export default function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const auth = requireAuth(req, res)
  if (!auth) return
  const { user } = auth

  if (user.role !== 'admin' || user.tenant !== req.query.slug) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const t = upsertTenantPlan(req.query.slug, 'pro')
  if (!t) return res.status(404).json({ error: 'Tenant not found' })
  return res.json({ ok: true, tenant: t })
}
