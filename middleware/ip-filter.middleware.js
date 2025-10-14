
export default function ipFilterMiddleware(req, res, next) {
  const clientIp = req.ip;
  const allowedIps = process.env.RAW_ALLOWED_IPS?.split(' ') || [];

  if (!allowedIps.includes(clientIp)) {
    console.warn('Access denied for IP: ' + clientIp);
    return res.status(403).send('Access denied');
  }
  next();
}