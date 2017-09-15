const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const port = process.argv[2] || 9000

function putJson (req) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    if (body !== '') fs.writeFile('./tasks.json', body, 'utf8')
  })
}

http.createServer(function (req, res) {
  let pathname = '.' + url.parse(req.url).pathname
  const mimeType = {
    '.html': 'text/html',
    '.json': 'application/json'
  }
  if (req.method === 'PUT') putJson(req)
  if (fs.statSync(pathname).isDirectory()) {
    pathname += 'index.html'
  }
  fs.readFile(pathname, function (err, data) {
    if (err) throw err
    else {
      const ext = path.parse(pathname).ext
      res.setHeader('Content-type', mimeType[ext] || 'text/plain')
      res.end(data)
    }
  })
}).listen(parseInt(port))
