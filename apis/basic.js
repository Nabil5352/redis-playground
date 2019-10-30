const express = require("express");
const router = express.Router();

router.get("/get/:key", getReposCache, async (req, res) => {
	try {
		console.log("Fetching data...");
		const { key } = req.params;
		client.setex(key, 3600, []);
		res.send({ key: [] });
	} catch (err) {
		console.log(err);
		res.status(500);
	}
});
