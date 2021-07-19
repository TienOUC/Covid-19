const fs = require('fs')
const path = require('path')
// 定时
const nodeSchedule = require('node-schedule')
// 模拟浏览器向网站发送请求
const superagent = require('superagent')
// 服务器端的 jQuery
const cheerio = require('cheerio')

// 爬取微博热搜
const weiboURL = 'https://s.weibo.com'
const hotSearchURL = weiboURL + '/top/summary?cate=realtimehot'
function getHotSearchList() {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL, (err, res) => {
      if (err) reject('request error')
      const $ = cheerio.load(res.text)
      let hotList = []
      $('#pl_top_realtimehot table tbody tr').each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1)
          const link = weiboURL + $td.find('a').attr('href')
          const text = $td.find('a').text()
          const hotValue = $td.find('span').text()
          const icon = $td.find('img').attr('src')
            ? 'https:' + $td.find('img').attr('src')
            : ''
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon,
          })
        }
      })
      hotList.length ? resolve(hotList) : reject('error')
    })
  })
}

// 每小时的1分30秒触发
nodeSchedule.scheduleJob('10 1 * * * *', async function () {
  try {
    const hotList = await getHotSearchList()
    await fs.writeFileSync(
      path.join(__dirname, '../data/weiboHotSearch.json'),
      JSON.stringify(hotList),
      'utf8'
    )
    console.log('weiboHotSearch.json 写入成功')
  } catch (err) {
    console.error(err)
  }
})
