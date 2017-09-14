const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const port = process.argv[2] || 9000

http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url)
  let pathName = `.${parsedUrl.pathName}`
  const mimeType = {
    '.html': 'text/html',
    '.json': 'application/json'
  }

  fs.exists(pathName, function (exists) {
    if (!exists) {
      res.statusCode = 404
      res.end(`File ${pathName} not found!`)
      return
    }

    if (fs.statSync(pathName).isDirectory()) {
      pathName += '/index.html'
    }

    fs.readFile(pathName, function (err, data) {
      if (err) {
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        const ext = path.parse(pathName).ext
        res.setHeader('Content-type', mimeType[ext] || 'text/plain')
        res.end(data)
      }
    })
  })
}).listen(parseInt(port))
