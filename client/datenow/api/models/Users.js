/**
 * Profile
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

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
	
	gender:{
		type: 'string',
		required: true
	},

	smoker:{
		type: 'boolean',
		required: true
	},

	housing:{
		type: 'string',
		required: true
	},

	relationshipstatus:{
		type: 'string',
		required: true
	},

	employment:{
		type: 'string',
		required: true
	},

	height: {
		type: 'string', 
		require: true
	},

	bodytype:{
		type: 'string',
		required: true
	},
	
	haircolor: {
		type: 'string',
		require: true
	},

	education:{
		type: 'string',
		required: true
	},

	owns:{
		type: 'string',
		required: true
	},

	children:{
		type: 'string',
		required: true
	},

	description:{
		type: 'string',
		required: true
	},

	prefgender: {
		type: 'string',
		require: true
	},

	prefagestart: {
		type: 'integer',
		require: true
	},

	prefageend: {
		type: 'integer',
		require: true
	},

	radius: {
		type: 'integer',
		require: true
	}	

  },



};
