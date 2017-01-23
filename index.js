//var cors = require('cors')
var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./sampledb.js');
var path = require('path');
db.initializeDB();
app.use('/static', express.static(path.join(__dirname, 'webcomponents')));
/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
   // app.use(cors());
}*/

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/webcomponents/index.html');
});

app.get('/getAllMessages', function(req, res) {
    db.getAllFromDB(function(obj) {
        res.send(obj);
    }, function() {
        res.send([]);
    });

})
io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(user, msg) {
    	console.log(user+"-----"+msg);
        db.pushToDB({ "username": user, "description": msg }, function(sMsg) {
            console.log("successfully inserted data into mysqlite");
            socket.broadcast.emit('chat message', user, msg);
        }, function(err) {
            console.log("insertion failed---" + err);
        })

    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
