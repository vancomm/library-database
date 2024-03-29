/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function auth(req, res, next) {
  const authHeader = req.get('authorization');
  const token = authHeader?.split(' ')[1];
  console.log(`Received auth token of length ${token?.length || 0}.`);
  if (!token) {
    console.log('Request declined (unauthorized).');
    return res.status(401).json({ message: 'Authentication token required.' });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: err });
    console.log(`Verified as user: ${JSON.stringify(payload.username)}`);
    req.username = payload.username;
    next();
  });
}
