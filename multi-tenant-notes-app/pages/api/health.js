import { setCors } from './_utils.js'
export default function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  res.status(200).json({ status: 'ok' })
}
