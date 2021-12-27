// module.exports.headers = (req, res, next) => {
// 	const origin = (req.headers.origin == 'http://localhost:3000') ? 'http://localhost:3000' : 'https://meal-pass-rw.herokuapp.com/'
// 	res.setHeader('Access-Control-Allow-Origin', origin)
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
// 	res.setHeader('Access-Control-Allow-Credentials', true)
// 	next()
// }

const cors = require('cors');

const corsOptions = {
	"origin": "http://localhost:3000",
	"optionsSuccessStatus": 200,
	"preflightContinue": "false",
	"Access-Control-Allow-Headers": "X-Token, Content-Type",
	"Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
	"Access-Control-Allow-Credentials": "true",
	"Access-Control-Allow-Origin": "*"
}

module.exports = cors(corsOptions);