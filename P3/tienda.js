const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080
var productos = "";
var contador = 0;
//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  let q = url.parse(req.url, true),
      filename = '';
  const cookie = req.headers.cookie;

  if (q.pathname == '/') {
    if (!cookie) {
        filename = 'index.html'
      } else {
        filename = 'index2.html'
      }
  } else {
    filename = q.pathname.slice(1);
  }
  //la primera vez que se pulse el boton de registrame y nos muestre index2 se crea la cookie
  if (q.pathname == '/index2.html') {
    if (!cookie) {
        console.log("entra")
        res.setHeader('Set-Cookie', 'user=Nakama;');
      }
  }

  console.log(filename)
  console.log("VECEEEEEEEEES")
  switch (filename){
    case "listacompra.html":
      if (req.method == 'POST'){
        var content = `
            <!DOCTYPE html>
            <html lang="es">
              <head>
                <meta charset="utf-8">
                <title>Carrito</title>
              </head>
              <body>
                <p>Tienes en el carro:`

            req.on('data', chunk => {
                //-- Leer los datos (convertir el buffer a cadena)
                data = chunk.toString();
                console.log(data)
                productoactual = data.split('=')[1],
                productos += " "
                productos += productoactual
                content += productos
                contador += 1
                var contenidocookie = ["producto" + contador + "=" + productoactual]
                res.setHeader('Set-Cookie', contenidocookie);
                content += `
                    </p>
                    <a href="/">Pagina principal</a>
                  </body>
                </html>
                `
                //-- Mostrar los datos en la consola del servidor
                console.log("Datos recibidos: " + data)
                res.statusCode = 200;
             });

             req.on('end', ()=> {
               //-- Generar el mensaje de respuesta
               res.setHeader('Content-Type', 'text/html')
               res.write(content);
               res.end();
             })
             return
      };
      break
    case "terminarcompra":
    console.log(req.method);
      if (req.method == 'POST'){
        var content = `
            <!DOCTYPE html>
            <html lang="es">
              <head>
                <meta charset="utf-8">
                <title>Terminar Compra</title>
              </head>
              <body>
                <p>Tienes en el carro:`
                const infocookie = req.headers.cookie;
                const numeroprod = infocookie.split('; ').length
                var cookieentera = ""
                var producto = ""
                for (var i = 1; i < numeroprod; i++) {
                  cookieentera = infocookie.split('; ')[i]
                  producto = cookieentera.split("=")[1]
                  content += (" " + producto)
                }
                content += `
                    </p>
                    <form style="text-align:center" action="/myformfinal" method="post">
                      Nombre:
                      <input type="text" name="Nombre" value=""/> <br />
                      Apellido:
                      <input type="text" name="Apellido" value=""/> <br />
                      Correo Electronico:
                      <input type="text" name="Correo" value=""/> <br />
                      Metodo de pago:
                      <input type="radio" name="mpago" value="1">Paypal
                      <br>
                      <input type="radio" name="mpago" value="2">Tarjeta de crédito
                      <br>
                      <input type="radio" name="mpago" value="3">Transferencia bancaria
                      <input type="submit" value="Enviar"/>
                    <a href="/">Pagina principal</a>
                  </body>
                </html>
                `
                //-- Mostrar los datos en la consola del servidor
                res.statusCode = 200;
               //-- Generar el mensaje de respuesta
               res.setHeader('Content-Type', 'text/html')
               res.write(content);
               res.end();
               return
      };
      break
    default:
      content = "Error";
      res.statusCode = 404;
  }






  let extension = filename.split('.')[1],
      code = 200,
      mime = 'text/html';
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
      return res.end('Error: file not found');
    }
    res.writeHead(code, {'Content-Type': mime});
    res.write(data);
    return res.end();
  });
}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
