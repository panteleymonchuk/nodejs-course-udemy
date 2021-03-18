const http = require('http');

// Method which actually returns a server. But we need to run this server.
const server = http.createServer((req, res) => {
    // req.url - '/', всё, что после localhost:3000
    // req.method - 'GET', метод с помощью которого был отправлен запрос
    // req.headers - {}, заголовки которые были переданы.
    
    // console.log(req.url, req.method, req.headers);
    
    
    
    
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head>');
        res.write('<title>My first page</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<form action="/form" method="POST"><input name="message" /><button type="submit">Submit</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end(); // даём понять, что мы закончили ответ
    }
    
    if (req.url === '/form' && req.method === 'POST') {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    // process.exit();
});

server.listen(3000);
