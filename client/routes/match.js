var mysql      = require('mysql');

exports.notify = function(req, res){
	data = req.body
	if (typeof req.session.userid === 'undefined'){
		res.send("Not logged in.", 400);
	}
	else{
		q = "SELECT a.user_id AS user1, a.likes AS user2 FROM meet a JOIN meet b WHERE a.user_id = b.likes AND b.user_id = a.likes AND a.user_id = "+req.session.userid+";"
		console.log(q)
		var connection = mysql.createConnection({
			host     : '10.19.8.250',
			user     : 'nicholas',
			password : 'nicholas',
			database : 'testdb'
		})
		connection.query(q, function(err, rows, fields) {
			if (err) throw err;
			res.send(rows, 200);		
		})
	}
}
