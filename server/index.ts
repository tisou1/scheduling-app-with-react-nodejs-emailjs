import express from 'express'

const app = express()
const PORT = 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({
    messgae: 'Hello world',
  })
})

app.listen(PORT, () => {
  console.log(`服务启动在 http://localhost:${PORT}`)
})
