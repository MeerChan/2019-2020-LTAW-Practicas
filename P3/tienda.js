const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  let q = url.parse(req.url, true),
      filename = '';
  if (q.pathname == '/') {
    filename = 'index.html'
  } else if (q.pathname == '/myform') {

  } else {
    filename = q.pathname.slice(1);
  }
  let extension = filename.split('.')[1],
      code = 200,
      mime = 'text/html';
  console.log('required: ' + filename)
  switch (extension) {
    case 'png':
    case 'jpg':
    case 'ico':
    case 'jpeg':
      mime = 'image/' + extension;
      break;
    case 'css':
    case 'html':
      mime = 'text/' + extension;
      break;
    case 'json':
      mime = 'application/' + extension;
      break;
    default:
      code = 404;
      filename = 'layout/error.html';
  }
  fs.readFile(filename, (err, data) => {
    if (err){
      res.writeHead(404, {'Content-Type': 'text/html'})
      return res.end('SUPER-ERROR: file not found');
    }
    res.writeHead(code, {'Content-Type': mime});
    res.write(data);
    return res.end();
  });
}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
