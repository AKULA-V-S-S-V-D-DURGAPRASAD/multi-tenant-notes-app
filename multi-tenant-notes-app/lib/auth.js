import jwt from 'jsonwebtoken'
import { getUserByEmail } from './store.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_for_assignment'
const JWT_EXPIRES_IN = '12h'

export function signUser(user) {
  const payload = { userId: user.id, email: user.email, role: user.role, tenant: user.tenant }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

export { getUserByEmail }
