//-- Puerto donde recibir las peticiones
const PUERTO = 8080;
//-- Modulo del sistema de ficheros
const fs = require('fs');
//-- Modulo http
const http = require('http');

console.log("Arrancando servidor...")



//-- Funcion llamada cuando se ha terminado de leer el fichero
function show_file(err, data) {
    console.log("---> Comienzo del fichero leido")
    console.log(data)
    console.log("---> Final del fichero")
}

http.createServer((req,res) =>{
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  //-- me dice todas las propiedades de la cabecera
  for (prop in req.headers) {
    console.log("Propiedad: " + prop + " --> Valor: " + req.headers[prop])
  }
  if(req.url == "/producto1"){
    fs.readFile('producto1.txt', 'utf8', show_file);
    console.log("ENTRAAAAA")
  }
}).listen(PUERTO);



console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
