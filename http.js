var http = require('http');
var { a,b } = require('./db')
console.log(a,b)

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello Worldv dsdd')
  response.end();
}).listen(8088);

console.log('Server crunning at http://127.0.0.1:8088/');