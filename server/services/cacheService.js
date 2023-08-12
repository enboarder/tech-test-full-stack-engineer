const { createClient } = require("redis");

const client = createClient();
// client.on('error', err => console.log('Redis Client Error', err));
// client.connect();

class Cache {
    constructor() {
        client.on('error', err => console.log('Redis Client Error', err));
        client.connect();
    }

    async cacheData(req, res, next) {
        console.log(req.originalUrl)
        const cacheResults = await client.get(req.originalUrl);
        if (cacheResults) {
            console.log('------- cache Result -----');
            res.json({
                success: true,
                data: JSON.parse(cacheResults)
            });
        } else {
            next();
        }
    }

    async storeCache(key, value) {
        await client.set(key, JSON.stringify(value), {
            EX: 30,
            NX: true,
        });
    }
}

module.exports = new Cache();