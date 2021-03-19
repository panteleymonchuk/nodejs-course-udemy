const http = require('http');
const routes = require('./routes');
// Method which actually returns a server. But we need to run this server.
const server = http.createServer(routes);

server.listen(3000);
