/**
 * MeetController
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
    
  
  /**
   * Action blueprints:
   *    `/meet/create`
   */
   create: function (req, res) {
       console.log("meet::create");
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/meet/meetings`
   *
   *  retrieve all meetings for the current user
   */
   meetings: function (req, res) {
    
       console.log("meet:meetings");
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

    /**
     * retrieve detail of a meeting
     **/
    find: function (req, res) {
        console.log("meet:find");

        // Send a JSON response
        return res.json({
                        hello: 'world'
                        });
    },

  /**
   * Action blueprints:
   *    `/meet/destroy`
   * 
   * uer cancels a specific meeting
   */
   destroy: function (req, res) {
    
       console.log("meet:destroy");

       
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/meet/update`
   */
   update: function (req, res) {
    
       console.log("meet:update");

       
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MeetController)
   */
  _config: {}

  
};
