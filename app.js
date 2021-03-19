const http = require('http');

// Method which actually returns a server. But we need to run this server.
const server = http.createServer();

server.listen(3000);
