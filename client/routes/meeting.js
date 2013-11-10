/**
 Meeting Schedule and Handler
 **/

var mysql = require('mysql');

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
                                        host     : '10.19.8.250',
                                        user     : 'nicholas',
                                        password : 'nicholas',
                                        database : 'testdb'
                                        });


/**
 return all active meetings for the user
 **/
Meeting.meetings = function(req, res){
    var userid = 1234; //req.session.userid;
    console.log("meetings");
    
    var q = "SELECT meeting_id, user1_id, user2_id, status, error, new FROM meeting WHERE user1_id = '" + userid + "' OR user2_id = '" + userid +"';";
    console.log(q);
    
    connection.query(q, function(err, rows, fields){
                     if(err) console.log(err);
                     res.send(rows, 200);
                     });
    
    /*
     Meeting.create(1234, 3461, function(userid){
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
    var userid = 1234; //req.session.userid;
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
    var userid = 1234; //req.session.userid;
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