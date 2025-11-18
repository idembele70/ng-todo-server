import { env } from '../../config/env.js';


export default function ipFilterMiddleware(req, res, next) {
  const clientIp = req.ip;

  if (!env.ALLOWED_IPS.includes(clientIp)) {
    console.warn('Access denied for IP: ' + clientIp);
    return res.status(403).send('Access denied');
  }
  next();
}