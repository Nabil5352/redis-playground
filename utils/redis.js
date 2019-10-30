const CONFIG = require("../config");

const client = redis.createClient(CONFIG.REDIS_PORT);

module.exports = client;
