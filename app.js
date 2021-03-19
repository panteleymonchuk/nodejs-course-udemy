const http = require('http');
const fs = require('fs');

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
        res.write('<form action="/form" method="POST"><input name="message" /><input name="text" /><button type="submit">Submit</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end(); // даём понять, что мы закончили ответ
    }
    
    if (req.url === '/form' && req.method === 'POST') {
        const body = [];
        console.log('Код будет выполнен первым');
        req.on("data", (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(' --- parsedBody --- ', parsedBody);
            fs.writeFile('./nameOfFile.txt', 'fasdf',(err) => {
                console.log('код будет выполнен третьим');
                return res.end();
            });
            
        });
        console.log('код будет выполнен вторым');
    }
    
    console.log('код будет выполнен если в if нету return')
    // process.exit();
});

server.listen(3000);
