
/*
 * GET users listing.
 */

function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}

var mysql      = require('mysql');

exports.meet = function(req, res){
	data = req.body
	if (typeof req.session.userid === 'undefined'){
		res.send("Not logged in.", 400);
	}
	else if (typeof data.who === "undefined"){
		res.send("Not valid match.", 400);
	}
	else{
		var q = "INSERT INTO meet (user_id, likes, timestamp) VALUES ('"+req.session.userid +"', '"+data.who +"', NOW());"
		console.log(q)
		var connection = mysql.createConnection({
			host     : '10.19.8.250',
			user     : 'nicholas',
			password : 'nicholas',
			database : 'testdb'
		})
		connection.query(q, function(err, rows, fields) {
			if (err) throw err;
			// Should check to see if a meeting is mutual and alert the user.
			
		})
		res.send("success", 200);
	}
}

exports.list = function(req, res){
	if (typeof req.session.userid === 'undefined'){
		res.send("Not logged in.", 400);
	}
	else{
		// This query is crude and not really what we need, but okay for testing purposes.
		var q = "SELECT * FROM user WHERE city = (SELECT city FROM user WHERE user_id = " + req.session.userid + ") ORDER BY RAND() LIMIT 1;"
		console.log(q)
		var connection = mysql.createConnection({
			host     : '10.19.8.250',
			user     : 'nicholas',
			password : 'nicholas',
			database : 'testdb'
		}).query(q, function(err, rows, fields) {
			if (err) throw err;
			// We shouldn't send back all the data like the user password and email!
			res.send(rows, 200);
		})
	}
};

exports.login = function(req, res){
	var data = req.body
	var connection = mysql.createConnection({
		host     : '10.19.8.250',
		user     : 'nicholas',
		password : 'nicholas',
		database : 'testdb'
	});
	console.log(req.body)
	var q = "SELECT user_id AS id FROM user WHERE username = '"+ data.username +"' AND password = '"+ data.password +"';"
	console.log(q)
	connection.query(q, function(err, rows, fields) {
		if (err) throw err;
		if (typeof rows[0] !== 'undefined'){
			req.session.userid = rows[0].id;
			res.send(req.session.userid, 200)
		}
		else {
			req.session.userid = 'undefined';
			res.send("Invalid username and password.", 400)
		}
	})
}

exports.create = function(req, res){

	console.log(req.files)
	var data = req.body
	console.log(data)
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
		else if (typeof data.age === "undefined"){
			res.send({feild: "postal", error: "Value required."}, 400);
		}
		else if (typeof data.gender === "undefined"){
			res.send({feild: "gender", error: "Value required."}, 400);
		}
		else if (typeof data.smoker === "undefined"){
			res.send({feild: "smoker", error: "Value required."}, 400);
		}
		else if (typeof data.postal === "undefined"){
			res.send({feild: "housing", error: "Value required."}, 400);
		}
		else if (typeof data.postal === "undefined"){
			res.send({feild: "status", error: "Value required."}, 400);
		}
		else if (typeof data.postal === "undefined"){
			res.send({feild: "employment", error: "Value required."}, 400);
		}
// education, description, height, bodytype, haircolor, prefgender, prefagestart, prefageend, radius
		else{
			var q = "INSERT INTO user (username, password, email, street, city, state, country, postal, age, gender, smoker, housing, status, employment, education, description, height, bodytype, haircolor, prefgender, prefagestart, prefageend, radius) VALUES ('"
			+data.username+"', '"+data.password+"', '"+data.email+"', '"+data.street+"', '"+data.city+"', '"+data.state+"', '"+data.country+"', '"+data.postal+
			"', '"+data.age+"', '"+data.gender+"', '"+(0 + (data.smoker === "Yes"))+"', '"+data.housing+"', '"+data.status+"', '"+data.employment+"', '"+data.education+"', '"+data.biography+"', '"+data.height.replace("'", "_")+"', '"+data.btype+"', '"+data.hair+"', '"+data.genderpref+"', '"+data.prefagestart+"', '"+data.prefageend+"', '"+data.radius+"');"
			console.log(q)
			connection.query(q, function(err, rows, fields) {
		  		if (err) throw err;
				connection.query("SELECT LAST_INSERT_ID() AS id;", function(err, rows, fields) {
			  		if (err) throw err;
					userid = rows[0].id
					console.log(userid)
					req.session.userid = userid
					res.send(userid, 200)
				});
			});
		}
	});
};
