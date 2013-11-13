/**
 Meeting Schedule and Handler
 **/

var mysql = require('mysql');
var util = require('util');

var foursquare = (require('foursquarevenues'))('2QIWADP4J2Y3FPA0A4ZLD3CWBSEQS5C053TY15OR2PAYBLUC', 'NQRO4YW4PGCGHQE110YYWPYBMPJSG22YCAZQ4PCA4RAS5ONW');


var Meeting = {};

var MeetingStatus = {
    NEGOTIATING : "negotiating",
    SCHEDULED : "scheduled"
}

var ScheduleError = {
    NO_ERROR : "no_error",
    FAIL_OVERLAP : "no_overlap"
}

//db connection
var connection = mysql.createConnection({
                                        host     : '127.0.0.1',
                                        user     : 'datenow',
                                        password : 'datenow',
                                        database : 'testdb'
                                        });
var handleErr = function(err){
    console.log(util.inspect(err));
    connection = mysql.createConnection({
                                        host     : '127.0.0.1',
                                        user     : 'datenow',
                                        password : 'datenow',
                                        database : 'testdb'
                                        });
    connection.on('error', handleErr);
    connection.on('end', handleErr);
    connection.on('unhandledError', handleErr);
};

connection.on('error', handleErr);
connection.on('end', handleErr);
connection.on('unhandledError', handleErr);


//geocoder
var geocoder = require('node-geocoder').getGeocoder("google", 'http');

/**
 return all active meetings for the user
 **/
Meeting.meetings = function(req, res){
    var userid = req.session.userid;
    console.log("meetings");
    
    //var q = "SELECT meeting_id, user1_id, user2_id, status, error, new FROM meeting WHERE user1_id = '" + userid + "' OR user2_id = '" + userid +"';";
	var q = "SELECT DISTINCT meeting_id, a.username AS user1, b.username AS user2, m.status, error, new FROM meeting m JOIN user a ON m.user1_id = a.user_id JOIN user b ON m.user2_id = b.user_id WHERE m.user1_id = '" + userid +"' OR m.user2_id = '" + userid +"';";
    console.log(q);
    
    connection.query(q, function(err, rows, fields){
                     if(err) console.log(err);
                     res.send(rows, 200);
                     });
    
     /*
     Meeting.create(1234, 1234, function(userid){
     console.log("new record " + userid);
     });
    
    
     Meeting.create(2311, 2345, function(userid){
     console.log("new record " + userid);
     });
     
     Meeting.create(1234, 4444, function(userid){
     console.log("new record " + userid);
     });
     */
};


/**
 retrieve details of a meeting via meeting id
 
 mark the meeting as read / not new
 **/
Meeting.get = function(req, res){
    var userid = req.session.userid;
    var meetingid = req.params.id;
    console.log("meeting.get " + meetingid);
    
    var q = "SELECT * FROM meeting WHERE meeting_id = '" + meetingid + "';";
    connection.query(q, function(err, rows, fields){
                     if(err) console.log(err);
                     res.send(rows, 200);
                     
                     //mark as read / not new
                     var q2 = "UPDATE meeting SET new = false WHERE meeting_id = '" + meetingid + "';";
                     connection.query(q2, function(err,rows,fields){
                                      if(err) console.log(err);
                                      console.log(meetingid + " new => false");
                                      });
                     
                     });
};


/**
 update a meeting schedule
 **/
Meeting.update = function(req, res){
    var userid = req.session.userid;
    var meetingid = req.params.id;
    var beginDate = (new Date()).toString(); //req.params.beginDate;
    var endDate = (new Date()).toString(); //req.params.endDate;
    console.log("meeting.update for user " + userid + " for meeting " + meetingid);
    
    Meeting.update_schedule(meetingid, userid, beginDate, endDate, function(success){
                            res.send(success);
                            });
};

/**
 creating a new meeting record
 return via userID for the newly created record. null if creation failed
 **/
Meeting.create = function(user1_id, user2_id, callback){
    
    var userID = null;
    
    var q = "insert into meeting (user1_id, user2_id, status, error, new) values ('" + user1_id + "' , '" + user2_id + "', '" + MeetingStatus.NEGOTIATING + "' , '" + ScheduleError.NO_ERROR + "' ,  true ); ";
    console.log(q);
    
    connection.query(q, function(err, rows, fields){
                     if(err) console.log(err);
                     connection.query("SELECT LAST_INSERT_ID() AS id;", function(err, rows, fields) {
                                      if (err) throw err;
                                      userID = rows[0].id
                                      callback(userID);
                                      });
                     });
    
    
    //check two user's address, and pick a meet place
    
    //obtain both user's address
    var q1 = "SELECT street, city, state, country, postal FROM user WHERE user_id = '" + user1_id + "';";
    console.log(q1);
    connection.query(q1, function(err,rows,fields){
        if(err) console.log(err);
        var address1 = rows[0].street + " " + rows[0].city + " " + rows[0].state + " " + rows[0].country;
        console.log("address1="+address1);
        var q2 = "SELECT street, city, state, country, postal FROM user WHERE user_id = '" + user2_id + "';";
        console.log(q2);
        connection.query(q2, function(err,rows,fields){
            if(err) console.log(err);
            var address2 = rows[0].street + " " + rows[0].city + " " + rows[0].state + " " + rows[0].country;
            console.log("address2="+address2);
            
            //find out their geo location from address
            geocoder.geocode(address1, function(err, res) {
                console.log(res);
                if(err) console.log(err)
                if(res.count==0) return;
                
                var lat1 = res[0].latitude;
                var lng1 = res[0].longitude;
                
                geocoder.geocode(address2, function(err, res){
                    console.log(res);
                    if(err) console.log(err);
                    if(res.count==0) return;
                    
                    var lat2 = res[0].latitude;
                    var lng2 = res[0].longitude;
                
                            
                    var centerLat = (lat1+lat2)/2.0;
                    var centerLng = (lng1+lng2)/2.0;
                    
                    //search for coffee shop within 2km distance from center
                    var params = {'ll' : String(centerLat + "," + centerLng), 'categoryId' : "4bf58dd8d48988d1e0931735"};
                    foursquare.getVenues(params, function(err, data){
                        console.log(venues);
                        
                        if(data && data.response && data.response.venues){
                            var venues = data.response.venues;
                            
                            
                            //sort by distance
                            venues.sort(function(a,b){
                                return (a.location.distance < b.location.distance);
                            });
                            
                            for(var i=0;i<venues.count;i++)
                                console.log(util.inspect(venues[i]));
                                
                                
                            //pick the closest venue
                            var meetPlace = venues[0];
                            
                        }
                    });
                    
                });
            });
            
            
        });
    });
    

};


/**
 Check if any new unread meetings
 **/
Meeting.new_meeting = function(req, res){
    console.log("Meeting::new_meeting");
    var userid = req.session.userid;
    
    var q = "SELECT COUNT(1) AS count FROM meeting WHERE new = TRUE AND ( user1_id = '" + userid + "' OR user2_id = '" + userid + "' );"
    console.log(q);
    
    connection.query(q, function(err, rows, fields){
                     if(err) console.log(err);
                     console.log(rows[0].count > 0);
                     res.send(rows[0].count > 0);
                     });
};

/**
 Modify schedule of a specific meeting of a specific user
 **/
Meeting.update_schedule = function(meetingid, userid, beginDate, endDate, callback){
    
    var q = "SELECT * from meeting WHERE meeting_id = '" + meetingid + "';";
    connection.query(q, function(err,rows,fields){
                     var q2 = "";
                     if(err) {
                     console.log(err);
                     callback(false);
                     }
                     if(rows[0].user1_id == userid){
                        q2 = "UPDATE meeting SET user1_schedule_begin='" + beginDate.toString() +"', user1_schedule_end='" + endDate.toString() +"' WHERE meeting_id='" + meetingid + + "';";
                     }
                     else if(rows[0].user2_id == userid){
                        q2 = "UPDATE meeting SET user2_schedule_begin='" + beginDate.toString() +"', user2_schedule_end='" + endDate.toString() +"' WHERE meeting_id='" + meetingid + + "';";
                     }
                     else{
                     console.log("WARNING: no matching user id found for meeting ");
                     callback(false);
                     }
                     
                     
                     connection.query(q2, function(err,rows,fields){
                                      if(err){
                                      console.log(err);
                                      callback(false);
                                      }
                                      else{
                                      callback(true);
                                      }
                                      });
                     });
    
};


module.exports = exports = Meeting;
