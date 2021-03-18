const http = require('http');

// Method which actually returns a server. But we need to run this server.
const server = http.createServer((req, res) => {
    // req.url - '/', всё, что после localhost:3000
    // req.method - 'GET', метод с помощью которого был отправлен запрос
    // req.headers - {}, заголовки которые были переданы.
    
    // console.log(req.url, req.method, req.headers);
    
    
    
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>My first page</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('Hello it\'s my first page.');
    res.write('</body>');
    res.write('</html>');
    res.end(); // даём понять, что мы закончили ответ
    // process.exit();
});

server.listen(3000);
