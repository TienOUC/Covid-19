const fs = require('fs')
const path = require('path')
// 定时
const nodeSchedule = require('node-schedule')
// 模拟浏览器向网站发送请求
const superagent = require('superagent')

// 导入selenium-webdriver
const { Builder, By, Key, until } = require('selenium-webdriver')
// 爬取万矿疫情数据  需注册账号并登陆才能爬取数据，官方Web API使用说明 :（ https://www.windquant.com/qntcloud/help/id-fdc2e335-7f50-4b63-b79c-07a2582cf15c ）
// S6274770 全国累计确诊
// S6274772 全国累计治愈
// S6274771 全国累计死亡
// S6274773 全国累计疑似
// S6274775 当日新增确诊
// S6274778 当日新增疑似
// S6274777 当日新增治愈
// S6274776 当日新增死亡
// 获取截止时间 返回 YYYY-MM-dd格式
function getTime() {
  let res = null
  let curDate = new Date()
  let preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
  let options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  res = preDate
    .toLocaleTimeString('zh-CN', options)
    .slice(0, 10)
    .replace(/\//g, '-')
  return res
}

//base url
const baseURL =
  'https://www.windquant.com/qntcloud/data/edb?userid=43a1bf78-8e78-48b7-bdff-65e041ffe268&'
//query string
const queryString =
  'indicators=S6274770,S6274772,S6274771,S6274773,S6274775,S6274778,S6274777,S6274776,S6274780,S6274782,S6274784&'
//截止时间
const endTime = `startdate=2020-01-20&enddate=${getTime()}`
//请求地址
const url = `${baseURL}${queryString}${endTime}`

async function getHistorydata() {
  try {
    const response = await superagent.get(url)
    const data = await response.text
    fs.writeFile(
      path.join(__dirname, '../data/historyData.json'),
      data,
      (err) => {
        if (err) {
          console.log(`[File Path Err] ${err}`)
        } else {
          console.log(`historyData.json写入成功`)
        }
      }
    )
  } catch (err) {
    console.log(`[Reqeust Err] ${err}`)
  }
}

async function getDataFromWindquant() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get(
      'https://www.windquant.com/cas/login?service=https%3A%2F%2Fwww.windquant.com%2Fqntcloud%2Flogin%2Fcas.go'
    )
    await driver
      .findElement(By.id('username'))
      .sendKeys('dktianf@163.com', Key.TAB)
    await driver
      .findElement(By.id('password'))
      .sendKeys('mengduonao123', Key.RETURN)
    await driver.wait(until.titleIs('万矿-高端量化分析云平台-Wind'), 1000)

    await getHistorydata()
  } catch (err) {
    console.log(err)
  } finally {
    driver.quit()
  }
}

nodeSchedule.scheduleJob('15 * * * * *', async function () {
  getDataFromWindquant()
    .then(() => {
      console.log(`success`)
    })
    .catch((err) => {
      throw new Error(err)
    })
})
