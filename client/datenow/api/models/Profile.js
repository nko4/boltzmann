/**
 * Profile
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

	// must check for uniqueness
    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: 'encrypted_password'
    },

    email: {
      type: 'email',
      required: true
    },

	street:{
	  type: 'string',
      require: true
	},

	city:{
	  type: 'string',
      require: true
	},	

	state:{
	  type: 'string',
      require: true
	},	

	country:{
	  type: 'string',
      require: true
	},	

	postal:{
	  type: 'string',
      require: true,
	  minLength: 6,
      maxLength: 6
	},

    age: {
      type: 'INTEGER',
      max: 150,
      required: true
    },
	
	height: {
		type: 'integer', 
		require: true
	}	

  },

  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }


};
