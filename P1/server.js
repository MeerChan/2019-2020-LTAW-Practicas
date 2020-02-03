//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http');

console.log("Arrancando servidor...")

http.createServer((req,res) =>{
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  for (prop in req.headers) {
    console.log("Propiedad: " + prop + " --> Valor: " + req.headers[prop])
  }
}).listen(PUERTO);



console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
