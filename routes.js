const fs = require('fs');


const routes = (req, res) => {
  // req.url - '/', всё, что после localhost:3000
  // req.method - 'GET', метод с помощью которого был отправлен запрос
  // req.headers - {}, заголовки которые были переданы.
  
  // console.log(req.url, req.method, req.headers);
  
  
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
      <head>
        <title>My first page</title>
      </head>
        <body>
          <form action="/create-user" method="POST">
            <input name="username" />
            <button type="submit">Submit</button>
          </form>
          <a href="/users">List of Users</a>
        </body>
      </html>
    `);
    // fs.readFile('./nameOfFile.txt', 'utf8', (err, data) => {
    //   console.log(data.split('\n'));
    // });
    return res.end(); // даём понять, что мы закончили ответ
  }
  
  if (req.url === '/create-user' && req.method === 'POST') {
    const body = [];
    req.on('data', (ch) => {
      body.push(ch);
    });
    return req.on('end', () => {
      fs.readFile('./nameOfFile.txt', (err, content) => {
        const [, parsedName] = Buffer.concat(body).toString().split('=');
        // console.log(content.toString());
        // return res.end();
        const newContent = [
          ...content.toString().split('\n').filter(el => el),
          parsedName
        ].join('\n');
        return fs.writeFile('./nameOfFile.txt', newContent, () => {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      })
    });
  }
  
  if (req.url === '/users') {
    return fs.readFile('./nameOfFile.txt', (err, contentBuff) => {
      const namesArr = contentBuff
        .toString()
        .split('\n')
        .filter(el => el)
        .map(el => `<p>${el}</p>`)
        .join('');
      
      res.write(`
        <html>
        <head>
          <title>My first page</title>
        </head>
          <body>
            ${namesArr}
            <a href="/">Form</a>
          </body>
        </html>
      `);
      return res.end();
    });
    // const body = [];
    // console.log('Код будет выполнен первым');
    // req.on("data", (chunk) => {
    //   body.push(chunk);
    //   console.log(chunk);
    // });
    // return req.on("end", () => {
    //   const parsedBody = Buffer.concat(body).toString();
    //   console.log(' --- parsedBody --- ', parsedBody);
    //   fs.writeFile('./nameOfFile.txt', 'fasdf', (err) => {
    //     console.log('код будет выполнен третьим');
    //     return res.end();
    //   });
    //
    // });
    // console.log('код будет выполнен вторым');
  }
  
  console.log('код будет выполнен если в if нету return')
  // process.exit();
};

module.exports = routes;
