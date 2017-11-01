// dependencies
const express = require('express'),
      bodyParser = require('body-parser');

// initialize our app

const app = express();

// setup middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// port 
const port = process.env.PORT || 3000;

// routes
app.get('/myip', (req, res)=>{
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||req.connection.socket.remoteAddress;
	let language = req.headers["accept-language"];
    let software = req.headers['user-agent'];
	let data = {
		"ipaddress":ip,
		"language":language,
		"software":software
	}
	
	return res.json(data)
})







// fallback routes
app.get('*', (req, res)=>{
	let data = {
		msg:"this is not a valid api,try with /myip"
	}

	return res.json(data);
})

app.post('*', (req,res)=>{
	let data ={
		msg: "you are not allowed to post anything here"
	}
   
   return res.json(data);

})


// listen 
app.listen(port, ()=>console.log(`server listening on the port ${port}`));
