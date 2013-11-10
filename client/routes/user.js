
/*
 * GET users listing.
 */

function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}

var mysql      = require('mysql');


exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.create = function(req, res){
	var data = req.body

	var connection = mysql.createConnection({
		host     : '10.19.8.250',
		user     : 'nicholas',
		password : 'nicholas',
		database : 'testdb'
	});

	connection.query("SELECT COUNT(1) AS count FROM user WHERE username = '"+ data.username +"';", function(err, rows, fields) {
		if (err) throw err;
		if(rows[0].count > 0){
			res.send({feild: "username", error: "Username not avaliable"}, 400);
		}
		else if (data.username.length < 6){
			res.send({feild: "username", error: "Not long enough"}, 400);
		}
		else if (data.password !== data.confirmpassword){
			res.send({feild: "password", error: "Passwords don't match!"}, 400);
		}
		else if (data.password.length < 6){
			res.send({feild: "password", error: "Password is to short."}, 400);
		}
		else if (!validEmail(data.email)){
			res.send({feild: "email", error: "Not a valid email address."}, 400);
		}
		else if (typeof data.street === "undefined"){
			res.send({feild: "street", error: "Value required."}, 400);
		}
		else if (typeof data.city === "undefined"){
			res.send({feild: "city", error: "Value required."}, 400);
		}
		else if (typeof data.state === "undefined"){
			res.send({feild: "state", error: "Value required."}, 400);
		}
		else if (typeof data.country === "undefined"){
			res.send({feild: "country", error: "Value required."}, 400);
		}
		else if (typeof data.postal === "undefined"){
			res.send({feild: "postal", error: "Value required."}, 400);
		}
		else{
			var q = "INSERT INTO user (username, password, email, street, city, state, country, postal) VALUES ('"+data.username+"', '"+data.password+"', '"+data.email+"', '"+data.street+"', '"+data.city+"', '"+data.state+"', '"+data.country+"', '"+data.postal+"');"
			console.log(q)
			connection.query(q, function(err, rows, fields) {
		  		if (err) throw err;
				connection.query("SELECT LAST_INSERT_ID() AS id;", function(err, rows, fields) {
			  		if (err) throw err;
					userid = rows[0].id
					console.log(userid)
					res.send(userid, 200)
				});
			});
		}
	});
};
