const socket = io.connect('http://localhost:3000', { transports : ['websocket'] });
socket.emit('connection');

socket.on('colore', function (data) { //ricevo
  document.body.style.background = data.colore;
  console.log(data.colore);
});

function invia(){
  let getnome = document.getElementById('input');
  let getcolore = document.getElementById('colors');
  if (getnome.checkValidity() && getcolore.checkValidity() && getcolore.value!='null') {
    let nome = getnome.value;
    let colore = getcolore.value;
    document.body.style.background = colore;
    socket.emit('nome-colore',{nome: nome, colore: colore});
  }
}