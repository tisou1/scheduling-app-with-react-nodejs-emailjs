import express from 'express'
import type { Database } from './interface'

const app = express()
const PORT = 4000

const database: Database[] = []
function generateID() {
  return Math.random().toString(36).substring(2, 10)
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({
    messgae: 'Hello world',
  })
})
// 注册
app.post('/register', (req, res) => {
  const { username, password, email } = req.body

  const result = database.filter(user => user.email === email && user.username === username && user.password === password)
  if (result.length === 0) {
    database.push({
      id: generateID(),
      username,
      password,
      email,
      timezone: {},
      schedule: [],
    })
    return res.json({ message: 'Account created successfully!' })
  }

  res.json({ error_message: 'User already exists!' })
})
// 登录
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const result = database.filter(
    user => user.username === username && user.password === password,
  )

  if (result.length !== 1) {
    return res.json({
      error_message: 'Incorrect credentials',
    })
  }
  return res.json({
    message: 'Login successfully',
    data: {
      _id: result[0].id,
      _email: result[0].email,
    },
  })
})

// 调度创建
app.post('/schedule/create', (req, res) => {
  const {
    userId,
    timezone,
    schedule,
  } = req.body

  const result = database.filter(user => user.id === userId)
  result[0].timezone = timezone
  result[0].schedule = schedule
  res.json({ message: 'OK' })
})

// 展示调度
app.post('/schedule/:id', (req, res) => {
  const { id } = req.params
  const result = database.filter(user => user.id === id)
  if (result.length === 1) {
    return res.json({
      message: 'Schedules successfully retrieved!',
      schedules: result[0].schedule,
      username: result[0].username,
      timezone: result[0].timezone,
    })
  }
  return res.json({
    error_message: 'Sign in again, an error occured...',
  })
})

// 用户数据
app.post('/schedule/:username', (req, res) => {
  const { username } = req.body
  const result = database.filter(db => db.username === username)

  if (result.length === 1) {
    const schedultArray = result[0].schedule
    const filteredArray = schedultArray.filter(sch => sch.startTime !== '')
    return res.json({
      message: 'Schedules successfully retrieved!',
      schedules: filteredArray,
      timezone: result[0].timezone,
      receiverEmail: result[0].email,
    })
  }
  return res.json({ error_message: 'User doesn\'t exist' })
})

app.listen(PORT, () => {
  console.log(`服务启动在 http://localhost:${PORT}`)
})
