/*
  
  Created on: 2016
  Author: Mizael Martinez
  
*/
var http = require("http");
var url = require('url');
var util = require('util');

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  var falta_parametros="<!doctype html><head><meta charset='utf-8'/></head><body><script>alert('Faltan urls de imagenes =[');</script></body></html>";
   var correcto="<!doctype html><head><meta charset='utf-8'/></head><body><script></script></body></html>";


  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  console.log(query);
  //console.log(query["url_original"]);
if(query["url_original"]!=undefined && query["url_jpeg_2000"]!=undefined && query["url_jpeg_ls"]!=undefined && query["url_rlpe"]!=undefined)
{
  response.write(correcto);
  exec = require('child_process').exec;
  command = 'sudo python /opt/lampp/htdocs/Compresion/Servidor_Background/object/Grafica.py '+query["url_original"]+' '+query["url_jpeg_2000"]+' '+query["url_jpeg_ls"]+' '+query["url_rlpe"][1];
  var child = exec(command,
           function (error, stdout, stderr) {
              if (error !== null) {
                 console.log(error);
                 return;
              }
           });
}
else
  response.write(falta_parametros);
  response.end();
}).listen(8888);
