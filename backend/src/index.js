const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Mongoose
mongoose.Promise = global.Promise
mongoose
  .connect(
    'mongodb://localhost/twitterapp',
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('Conectado ao mongodb.')
  })
  .catch(err => {
    console.log('Erro ao se conectar no mongodb: ' + err)
  });s

app.get('/', (req, res) => {
  return res.send('Home!')
})

app.listen(8081, () => {
  console.log('Server started on port 8081')
})
