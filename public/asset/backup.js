// // const Koa = require("koa")
// // const static = require("koa-static")
// // const path = require("path")
// // const app = new Koa();
// // app.use(static(
// //   path.join(__dirname + '/public'),
// //   {
// //     index: "index.html"
// //   }
// // ))
// // app.listen(4000)


// var http = require('http')
// const url = require("url")
// const fs = require("fs")
// const path = require("path")
// const mime = require("./utils/mime")
// var server = http.createServer()
// server.on('request', function (req, res) {

//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//   res.setHeader('Access-Control-Allow-Methods', 'POST')
//   res.setHeader('Content-Type', 'application/json; charset=utf-8')

//   if (req.method.toUpperCase() === 'GET') {
//     var static = url.parse(req.url).pathname
//     console.log(static);
//     if (req.url === '/') static = "/index.html"
//     const extName = path.extname(static)
//     const contType = mime[extName] || "text/plain"
//     const pathName = path.join(__dirname, `../public/${static}`)
//     res.setHeader('Content-Type', contType + '; charset=utf-8')
//     fs.readFile(pathName, (err, data) => {
//       console.log(pathName);
//       if (err || !contType) {
//         res.end("╮(￣⊿￣)╭ file not found .")
//       } else {
//         res.end(data)
//       }
//     })
//   }
// })

// server.listen(4000, function () {
//   console.log('服务器启动成功了')
// })