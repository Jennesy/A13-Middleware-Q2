// app.js
const express = require('express')
const app = express()
const port = 3000

function setReqTimestamp(req, res, next) {
  res.locals.reqTime = new Date
  next()
}
function logReqResCycle(req, res) {
  const reqTime = res.locals.reqTime
  res.on('finish', () => {
    const resTime = new Date
    console.log(`${reqTime.toLocaleString()} | ${req.method} from ${req.originalUrl} | total time: ${Number(resTime) - Number(reqTime)}ms`)
  })
}

app.get('/', setReqTimestamp, (req, res, next) => {
  res.send('列出全部 Todo')
  next()
}, logReqResCycle)

app.get('/new', setReqTimestamp, (req, res, next) => {
  res.send('新增 Todo 頁面')
  next()
}, logReqResCycle)

app.get('/:id', setReqTimestamp, (req, res, next) => {
  res.send('顯示一筆 Todo')
  next()
}, logReqResCycle)

app.post('/', setReqTimestamp, (req, res, next) => {
  res.send('新增一筆  Todo')
  next()
}, logReqResCycle)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})