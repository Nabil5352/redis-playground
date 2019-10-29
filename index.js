const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const HttpsProxyAgent = require('https-proxy-agent');

const PORT = process.env.PORT || 5000;
var PROXY = process.env.http_proxy || 'http://10.10.20.55:80';
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app  = express();

app.listen(PORT, () => {
	console.log(`App listeing on port ${PORT}`)
})

const getReposCache = (req, res, next) =>{
	const {username} = req.params;

	client.get(username, (err, data)=>{
		if(err) throw err;

		if(data !== null){
			res.send(setResponse(username, data));
		}else{
			next()
		}
	})
}

const setResponse = (username, repos) => {
	return `<h2>${username} has ${repos} Github repos</h2>`;
}

const getRepos = async (req, res, next) =>{ 
	try{
		console.log("Fetching data...");
		const {username} = req.params;
		const response = await fetch(`https://api.github.com/users/${username}`, {agent: new HttpsProxyAgent(PROXY)});
		const data = await response.json();
		// console.log("DATA ", data);

		const repos = data.public_repos;

		client.setex(username, 3600, repos);
		res.send(setResponse(username, repos))
	}catch(err){
		console.log(err);
		res.status(500);
	}
}


app.get('/repos/:username', getReposCache, getRepos);