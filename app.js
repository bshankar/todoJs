const http = require('http')
const fs = require('fs')

fs.readFile('views/index.html', 'utf-8', function (err, s) {
  if (err) throw err
  let server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write(s)
    response.end()
  })
  server.listen(3000)
})
