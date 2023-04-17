import express from 'express'

const app = express()
const PORT = 4000

interface Database {
  id: string
  username: string
  password: string
  email: string
  timezone: {}
  schedule: any[]
}

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

app.listen(PORT, () => {
  console.log(`服务启动在 http://localhost:${PORT}`)
})
