var sqlite3 = require('sqlite3').verbose();
var file = "hr"; 
exports.initializeDB = function() {
    var db = new sqlite3.Database(file);
    console.log("into initialize");
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS MICRO_BLOG(USERID Text,DESCRIPTION Text)");
    });
     db.close();
};
exports.pushToDB = function(userObj,fnSuccess,fnError) {
    var db = new sqlite3.Database(file);
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO MICRO_BLOG VALUES (?,?)");
        stmt.run(userObj.username,userObj.description);
        stmt.finalize();
        fnSuccess();
        db.close();
    });
  
};
exports.getAllFromDB = function(fnSuccess,fnError) {
    var db = new sqlite3.Database(file);
    console.log("into get all");
    db.serialize(function() {
         db.all("SELECT  USERID as user,DESCRIPTION  FROM  MICRO_BLOG", function(err, rows) {
          fnSuccess(rows);
           db.close();
        });
    });
   
};


