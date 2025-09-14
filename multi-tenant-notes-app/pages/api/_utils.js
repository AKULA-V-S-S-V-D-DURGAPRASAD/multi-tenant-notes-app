import { verifyToken } from '../../lib/auth.js'
import { findTenantBySlug } from '../../lib/store.js'

export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function parseAuth(req) {
  const raw = req.headers?.authorization || req.headers?.Authorization
  if (!raw) return null
  const m = raw.split(' ')
  if (m.length !== 2) return null
  const token = m[1]
  const payload = verifyToken(token)
  return payload
}

export function requireAuth(req, res) {
  const payload = parseAuth(req)
  if (!payload) {
    res.status(401).json({ error: 'Unauthorized' })
    return null
  }
  const tenant = findTenantBySlug(payload.tenant)
  if (!tenant) {
    res.status(403).json({ error: 'Invalid tenant' })
    return null
  }
  return { user: payload, tenant }
}
