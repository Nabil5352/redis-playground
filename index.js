const express = require("express");
const app = express();

// init
const CONFIG = require("./config");
app.listen(CONFIG.PORT, () => {
	console.log(`App listeing on port ${CONFIG.PORT}`);
});

//api route
const basicApi = require("apis/basic");
app.use("/api/basic", basic);
