function get(req) {
  // if not directly return the empty object
  if (!req.url) return {}
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`)
  return Object.fromEntries(searchParams)
}

function post(req) {
  return new Promise((res) => {
    let data = []
    req.on('data', (chunk) => {
      data.push(chunk)
    })
    req.on('end', () => {
      data = Buffer.concat(data).toString()
      if (!data) return res({})
      try {
        res(JSON.parse(data))
      } catch (error) {
        console.error(error)
        res({})
      }
    })
  })
}
module.exports = async (req = {}) => {
  const isObject = Object.prototype.toString.call(req) !== '[object Object]'
  const str = "'Request' Parameters do not meet the requirements"
  if (isObject) throw new Error(str)
  const method = req.method ? req.method.toUpperCase() : void 0
  if (method === 'POST') return await post(req)
  if (method === 'GET') return get(req)

}