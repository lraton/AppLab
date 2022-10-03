const io = require('socket.io')(3000);
let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "applab"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});


io.sockets.on('connection', function (socket) {
  
  socket.on('connect', function (data) {
    con.query("SELECT colore, count(colore) as `value_occurrence` from nome_colore group by colore order by `value_occurrence` DESC LIMIT 1;", function (err, result) {
      if (err) throw err;
      socket.emit('colore', );
      console.log(result);
    });
  });

  socket.on('nome-colore', function (data) {
    console.log(data);
  });
});