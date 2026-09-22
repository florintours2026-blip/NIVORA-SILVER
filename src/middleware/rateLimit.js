// Lightweight placeholder. For production, use a shared store such as Redis
// and a maintained rate-limit middleware at the edge/API gateway.
module.exports = (req, res, next) => next();
