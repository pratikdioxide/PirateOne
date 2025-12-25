import { sql } from '../../../lib/db.js';
import jwt from 'jsonwebtoken';

function getUserId(req) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.userId;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const items = await sql`
      SELECT movie_id AS id, type, title, poster, added_at
      FROM watchlist
      WHERE user_id = ${userId}
      ORDER BY added_at DESC
    `;
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}