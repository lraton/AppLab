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
  console.log("Connected to the database!");
});


io.sockets.on('connection', function (socket) {
  
  socket.on('connection', function () {
    con.query("SELECT colore, count(colore) as `value_occurrence` from nome_colore group by colore order by `value_occurrence` DESC LIMIT 1;", function (err, result) {
      if (err) throw err;
      if(result==''){//se non ci sono colori
        socket.emit('colore', {colore: 'red'});
        console.log('red');
      }else{  //imposto il piu' utilizzato
        let data=JSON.parse(JSON.stringify(result));
        socket.emit('colore', data[0].colore);
        console.log(data[0].colore);
      }
      
    });
  });

  socket.on('nome-colore', function (data) {//ricevo il nome e il colore da caricare nel database
    console.log(data);
  });
});