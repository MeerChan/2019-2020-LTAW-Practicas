//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http');

console.log("Arrancando servidor...")

http.createServer((req,res) =>{
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  const cabecera = req.headers;
}).listen(PUERTO);
for (prop in cabecera) {
  console.log("Propiedad: " + prop + " --> Valor: " + cabecera[prop])
}


console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
