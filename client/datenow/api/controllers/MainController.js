/**
 * MainController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {
    index: function (req, res) {
         res.view();
    },

  signup: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
	var email = req.param('email');
	var street = req.param('street');
	var city = req.param('city');
	var state = req.param('state');
	var country = req.param('country');
	var postal = req.param('postal');
	var age = req.param('age');
	var gender = req.param('gender');
//	var smoker = req.param('smoker');
	var housing = req.param('housing');
	var relationshipstatus = req.param('relationshipstatus');
	var employment = req.param('employment');
	var height = req.param('height');
	var bodytype = req.param('bodytype');
	var haircolor = req.param('haircolor');
	var education = req.param('education');
	var haschildren = req.param('haschildren');
	var wantschildren = req.param('wantschildren');
	var prefgender = req.param('prefgender');
	var prefagestart = req.param('prefagestart');
	var prefageend = req.param('prefageend');
	var radius = req.param('radius');
    // Users.findByUsername(username)...
    // In v0.9.0 the find method returns an empty array when no results are found
    // when only one result is needed use findOne.
    Users.findOneByUsername(username)
    .done(function signupfindUser(err, usr){
      if (err) {
        // We set an error header here,
        // which we access in the views an display in the alert call.
        res.set('error', 'DB Error');
        // The error object sent below is converted to JSON
        res.send(500, { error: "DB Error" });
      } else if (usr) {
        // Set the error header
        res.set('error', 'Username already Taken');
        res.send(400, { error: "Username already Taken"});
      } else {
        var hasher = require("password-hash");
        password = hasher.generate(password);

        Users.create({ 
			username: username, password: password, email: email, 
			street: street, city : city, state: state, country : country, postal : postal,
			age : age, gender : gender, housing : housing, 
			relationshipstatus : relationshipstatus, employment : employment, height : height,
			bodytype : bodytype, haircolor : haircolor, education : education, haschildren : haschildren,
			prefgender : prefgender, prefagestart : prefagestart, prefageend : prefageend, radius: radius
		})
        .done(function signupCreatUser(error, user) {
          if (error) {
			console.log(JSON.stringify(error))
            // Set the error header
            res.set('error', 'DB Error');
            res.send(500, { error: "DB Error" });
          } else {
            req.session.user = user;
            res.send(user);
          }
        });
      }
    });
  },

  login: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    // Users.findByUsername(username)...
    // In v0.9.0 the find method returns an empty array when no results are found
    // when only one result is needed use findOne.
    Users.findOneByUsername(username)
    .done(function loginfindUser(err, usr){
      if (err) {
        // We set an error header here,
        // which we access in the views an display in the alert call.
        res.set('error', 'DB Error');
        // The error object sent below is converted to JSON
        res.send(500, { error: "DB Error" });
      } else {
        if (usr) {
          var hasher = require("password-hash");
          if (hasher.verify(password, usr.password)) {
            req.session.user = usr;
            res.send(usr);
          } else {
            // Set the error header
            res.set('error', 'Wrong Password');
            res.send(400, { error: "Wrong Password" });
          }
        } else {
          res.set('error', 'User not Found');
          res.send(404, { error: "User not Found"});
        }
      }
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MainController)
   */
  _config: {}

  
};
