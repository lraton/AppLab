const socket = io.connect('http://localhost:3000', { transports : ['websocket'] });

socket.on('colore', function (data) { //ricevo
  console.log(data);
});

function invia(){
  let getnome = document.getElementById('input');
  let getcolore = document.getElementById('colors');
  if (getnome.checkValidity() && getcolore.checkValidity() && getcolore.value!='null') {
    let nome = getnome.value;
    let colore = getcolore.value;
    document.body.style.background = colore;
    socket.emit('nome-colore',{nome: nome, colore: colore});
    console.log(nome,colore);
  }
  
}