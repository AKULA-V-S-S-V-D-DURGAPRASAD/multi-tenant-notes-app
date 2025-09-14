import { nanoid } from 'nanoid'

const now = () => new Date().toISOString()

export const TENANTS = [
  { id: 't_acme', name: 'Acme', slug: 'acme', plan: 'free', createdAt: now() },
  { id: 't_globex', name: 'Globex', slug: 'globex', plan: 'free', createdAt: now() },
]

export const USERS = [
  { id: 'u1', email: 'admin@acme.test', password: 'password', role: 'admin', tenant: 'acme', createdAt: now() },
  { id: 'u2', email: 'user@acme.test', password: 'password', role: 'member', tenant: 'acme', createdAt: now() },
  { id: 'u3', email: 'admin@globex.test', password: 'password', role: 'admin', tenant: 'globex', createdAt: now() },
  { id: 'u4', email: 'user@globex.test', password: 'password', role: 'member', tenant: 'globex', createdAt: now() },
]

export const NOTES = []

export function findTenantBySlug(slug) {
  return TENANTS.find(t => t.slug === slug)
}

export function upsertTenantPlan(slug, plan) {
  const t = findTenantBySlug(slug)
  if (!t) return null
  t.plan = plan
  return t
}

export function getUserByEmail(email) {
  return USERS.find(u => u.email.toLowerCase() === (email || '').toLowerCase())
}
