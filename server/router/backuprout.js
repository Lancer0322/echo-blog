const getData = require('../utils/body-data')
const GetClientIP = require('../utils/get-ip')
const {
  Init, Login,
  saveMumbler, deleteMumbler,
  getImg, saveImg
} = require("./control")
async function Router(req, res) {
  let body = {}
  let result = { status: "success" }
  try {
    // body = await getData(req)
    // if ("data" in body) {
    //   body.data.ua = req.headers['user-agent']
    //   body.data.ip = GetClientIP(req) || req.connection.remoteAddress;
    // }
    const contrller = {
      INIT: Init,
      LOGIN: Login,
      save_mumbler: saveMumbler,
      del_mumbler: deleteMumbler,
      save_img: saveImg,
    }
    const fn = contrller["INIT"]
    if (fn) {
      result.data = await fn({ name: 123, class: 456 })
    } else {
      result.data = "NotFound"
    }
  } catch (err) {
    result.status = "error: can not find route."
    console.log(err);
  }
  res.end(JSON.stringify(result))
}
module.exports = Router
