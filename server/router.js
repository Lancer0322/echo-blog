const fs = require("fs")
const path = require("path")
const mime = require("./utils/mime")
const getData = require('./utils/body-data')
const getClientIP = require('./utils/get-ip')

const { getImg } = require("./router/control")

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  const method = req.method.toUpperCase()
  let body = await getData(req)
  if (!global.EchoDB) {
    const dataFn = await require('./database/mongodb')()
    if (!dataFn) return
    global.EchoDB = dataFn
  }

  if (method === 'GET') {
    var static = req.url
    let result = { status: "success" }
    if (req.url === '/') static = "/index.html"
    const extName = path.extname(static)
    const contType = mime[extName] || "text/plain"
    res.setHeader('Content-Type', `${contType}; charset=utf-8`)
    if ('name' in body) {
      // 图床
      res.end(JSON.stringify(result))
    } else {
      // 静态文件
      const pathName = path.join(__dirname, `../public/${static}`)
      fs.readFile(pathName, (err, data) => {
        if (err || !contType) {
          res.end("╮(￣⊿￣)╭ file not found .")
        } else {
          res.end(data)
        }
      })
      // const pathName = path.join(__dirname, `../public/${static}`)
      // fs.readFile(pathName, (err, data) => {
      //   if (err || !contType) {
      //     result.data = "╮(￣⊿￣)╭ file not found ."
      //     res.end(JSON.stringify(result))
      //   } else {
      //     res.end(data)
      //   }
      // })
    }
  }

  if (method === 'POST') {
    // post请求
    if ("data" in body) {
      body.data.ua = req.headers['user-agent']
      body.data.ip = getClientIP(req) || req.connection.remoteAddress;
    }
    res.end(JSON.stringify(body))
  }
}