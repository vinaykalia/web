var express = require("express");
var app = express();
var port = 3700;

//app.set('views', __dirname + '/public');
//app.set('view engine', "html");
//app.engine('jade', require('jade').__express);
app.get("/", function(req, res) {
  res.sendFile(__dirname+'/public/index.html');
});

app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
console.log("Listening on port " + port);
