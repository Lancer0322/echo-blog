const defaultHeaders = [
  'headers.x-client-ip',
  'headers.x-real-ip',
  'headers.x-forwarded-for',
  'connection.remoteAddress',
  'socket.remoteAddress',
  'connection.socket.remoteAddress'
]

function getProperty(obj, str) {
  try {
    str = str.replace(/\[(\w+)\]/g, '.$1') // Handles array subscripts
    let arr = str.split('.')
    for (const i of arr) obj = obj[i]
    return obj
  } catch (e) { }
  return null
}

function getClientIP(req, headers = []) {
  if (Object.prototype.toString.call(req) !== '[object Object]') {
    throw new Error('"req" parameter is not legal')
  }
  headers = [...headers, ...defaultHeaders]
  for (const header of headers) {
    const ip = getProperty(req, header)
    if (ip) {
      return ip.split(',')[0].trim()
    }
  }
  return '0.0.0.0'
}

module.exports = getClientIP