var express=require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var fs=require('fs');
// // var ace=require('ace-code-editor')
// fs.readFileSync('ace.js','utf8')
var port = process.env.PORT || 3000;
// var editor=require('ace-code-editor')();
// app.set('view engine','ejs')
app.get('/', function (req, res) {
    
    res.sendFile(__dirname + '/index.html');
    // res.sendFile(__dirname+'/ace-builds/src/ace.js')
});
 app.use(express.static("./public"))

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
    socket.on('chat message', function (msg) {
        //console.log("message: " + msg);
        if(msg!=''){
            io.emit('chat message', msg);
        }
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});