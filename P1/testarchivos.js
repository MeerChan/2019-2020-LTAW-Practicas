const http = require('http');
const PUERTO = 8080

console.log("Arrancando servidor...")

//-- Configurar el servidor. Cada vez que llegue una peteicion se emite un
//-- evento y se invoa a la funcion server_req
http.createServer((req,res) =>{
  console.log("---> Peticion recibida")
}).listen(PUERTO);

console.log("Puerto: " + PUERTO)
