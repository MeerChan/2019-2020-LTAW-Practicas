//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);

//-- Puerto donde lanzar el servidor
const PORT = 8080
//-- Sirve para contar el numero de usuarios
var contador = 0;
//-- Para mostrar los meses y dias con letras
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/chat-1.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- Otra vista de prueba
app.get('/woala', (req, res) => {
  res.send('WOALA! Chuck Norris approved!! :-)');
  console.log("Acceso a /woala");
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  //-- Usuario conectado. Imprimir el identificador de su socket
  console.log('--> Usuario conectado!. Socket id: ' + socket.id);
  //-- Aumentamos el contador de usuarios
  contador += 1;
  //-- Le envia a todos el mensaje menos al que se acaba de unir.
  socket.broadcast.emit('msg','server: ' + socket.id + ' se ha unido al chat');

  //-- Le damos la bienvenida a través del evento 'hello'
  socket.emit('hello', "Eres el usuario numero " + contador);

  //-- respuesta a CMD mensajes de comandos
  socket.on('cmd', (msg) => {
    var respuesta = '';
    switch (msg) {
      case '/help':
        respuesta += '/help: muestra todos los comandos <br>';
        respuesta += '/list: muestra el numero de usuarios conectados <br>';
        respuesta += '/hello: te devolvera el saludo :) <br>';
        respuesta += '/date: muestra la fecha actual <br>';
        break;
      case '/list':
        respuesta += 'Ahora mismo somos: ' + contador ;
        break;
      case '/date':
        var f = new Date();
        respuesta += 'Hoy es ' + (diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
        break;
      case '/hello':
        respuesta = 'Te devuelvo el saludo, /hello';
        break;
      default:
        respuesta = 'No corresponde a ningun comando, para ver todos, /help';
    }
    socket.emit('msg', 'server: ' + respuesta);
  });

  //-- Función de retrollamada de mensaje recibido del cliente
  socket.on('msg', (msg) => {
    console.log("Usuario: " + socket.id + ': ' + msg);
    msg = 'Usuario: ' + socket.id + ': ' + msg;
    //-- Enviar el mensaje a TODOS los clientes que estén conectados
    io.emit('msg', msg);
  })

  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    contador -= 1;
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
    socket.broadcast.emit('msg','server: ' + socket.id + ' ha dejado el chat');
  });
});
