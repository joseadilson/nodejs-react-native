const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Paras as requisições real time
const server =require('http').Server(app); // Para extrair o servidor http que criou no express.
const io = require('socket.io')(server);

// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://localhost/twitterapp',
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('Conectado ao mongodb.');
  })
  .catch(err => {
    console.log('Erro ao se conectar no mongodb: ' + err);
  });

//Middleware
app.use((req, res, next) => {
  req.io = io;

  return next();
})

// Se o backend permite ou não outras apps acessarem as informações.
app.use(cors()); 

// Rotas
app.use(express.json());
app.use(require('./routes'));

server.listen(8081, () => {
  console.log('Server started on port 8081')
})
