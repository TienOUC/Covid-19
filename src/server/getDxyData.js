const fs = require('fs')
const path = require('path')
// 定时
const nodeSchedule = require('node-schedule')
// 模拟浏览器向网站发送请求
const superagent = require('superagent')
// 服务器端的 jQuery
const cheerio = require('cheerio')

// 爬取丁香园疫情数据
const url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia'
function getDataFromDxy() {
  superagent
    .get(url)
    .then((res) => {
      // 解析 html字符串从里面提取对应的疫情数据
      const $ = cheerio.load(res.text)
      var $getAreaStat = $('#getAreaStat').html()
      var $getListByCountryTypeService2true = $(
        '#getListByCountryTypeService2true'
      ).html()
      // console.log($getAreaStat);

      // 使用正则表达式，unescape()函数转编码,字符串切割或 eval函数将代码运行
      var dataObj = {} // 定义dataObj对象换掉源码的 window
      eval($getAreaStat.replace(/window/g, 'dataObj'))
      eval($getListByCountryTypeService2true.replace(/window/g, 'dataObj'))

      // fs模块写入数据到本地
      fs.writeFile(
        path.join(__dirname, '../data/data.json'),
        JSON.stringify(dataObj),
        (err) => {
          if (err) throw err
          console.log('data.json写入成功')
        }
      )
    })
    .catch((err) => {
      throw err
    })
}
// 每天的凌晨1点1分15秒触发
nodeSchedule.scheduleJob('50 1 * * * *', function () {
  getDataFromDxy()
})
