const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 86400 }); // 24 hours TTL

const cacheMiddleware = {
  cacheData: (key, data) => {
    cache.set(key, data);
  },

  getFromCache: (key) => {
    return cache.get(key);
  },

  clearCache: (key) => {
    cache.del(key);
  },
};

module.exports = cacheMiddleware;
