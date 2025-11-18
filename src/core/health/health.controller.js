export const get = (_req, res) => {
  const health = {
    uptime: process.uptime(),
    status: 'OK',
    error: null,
    memory: process.memoryUsage(),
    timestamp: Date.now(),
  };
  try {
    res.status(200).json(health)
  } catch (error) {
    health.error = error;
    res.status(503).json(health);
  }
}
