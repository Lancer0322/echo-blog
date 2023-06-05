const http = require('http')
const router = require('./router')

const PORT = process.env.ECHO_PORT || process.env.PORT || 4000

function Service() {
  const server = http.createServer(router)
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Service is up and running port: ' + PORT)
  })
}
Service()
module.exports = Service