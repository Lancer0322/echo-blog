const bcrypt = require('bcryptjs')
const path = require("path")
const fs = require("fs")
const {
  ECHO_USER = "echo_user",
  ECHO_ARTICLE = "echo_article",
  ECHO_MUMBLER = "echo_mumbler",
  ECHO_LINK = "echo_link",
  ECHO_ALBUM = "echo_album",
  ECHO_comment = "echo_comment",
} = process.env

function msg(obj) {
  obj === "false" ? obj.msg = "failed" : obj.msg = "success"
  return obj
}

async function Init(param) {
  console.log(param);
  return ("123")
  // const { name, password, email } = param
  // const { addAdmin, getAdmin } = global.EchoDB
  // global.Econfig = await getAdmin(ECHO_USER)
  // // console.log(global.Econfig);
  // // 如果已有则直接退出
  // if (global.Econfig) return
  // const option = {
  //   name,
  //   password: bcrypt.hashSync(password, 10),
  //   articlePage: 5,
  //   commentPage: 5,

  //   email,
  //   smtpServe: "smtp.qq.com",
  //   pass: "jxapknqoieqdbdhj",
  //   port: "587"
  // }
  // const result = await addAdmin(ECHO_USER, option)
  // global.Econfig = await getAdmin(ECHO_USER, option)
  // return msg(result)
}
async function Login(data) {

}
async function saveMumbler(data) {
  console.log(data);
}

async function deleteMumbler(data) {

}
async function getImg(req, res) {
  const { getImage } = global.EchoDB
  // 防止中文乱码
  const fileName = decodeURI(path.parse(req.url).name)
  const imgUrl = await getImage(ECHO_ALBUM, fileName)
  if (imgUrl === false) {
    res.end(msg(false))
  } else {
    const base64 = imgUrl.replace(/^data:image\/\w+;base64,/, "")
    const dataBUffer = Buffer.from(base64, 'base64')
    res.end(dataBUffer)
  }
}
async function saveImg(data) {
  const { saveData } = global.EchoDB
  if (data.imgData === "" || data.imgData === undefined) return msg(false)
  const result = await saveData(ECHO_ALBUM, data)
  return msg(result)
}
module.exports = {
  Init, Login,
  saveMumbler, deleteMumbler,
  getImg, saveImg
}