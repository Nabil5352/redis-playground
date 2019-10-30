const client = require("../utils/redis");

const getCacheByKey = (req, res, next) => {
	const { key } = req.params;

	client.get(key, (err, data) => {
		if (err) throw err;

		if (data !== null) {
			res.send({ key: data });
		} else {
			next();
		}
	});
};

const setCacheByKey = (key, value, maxAge) => {
	client.setex(key, maxAge, value);
};

module.exports = {
	getCacheByKey
};
