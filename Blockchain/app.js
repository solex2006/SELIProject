const express = require('express')
const next = require('next')
const cors = require('cors')
const server = express()
const api = require('./routes')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: ".", dev });
const routes = require("./routes");
const handler = routes.getRequestHandler(app);
//functions
const blockchainCtrl = require('./controllers/blockchain')
const userCtrl = require('./controllers/user')



server.use(express.json()); //Permite recibir peticiones json en el Servidor
server.use(express.urlencoded({ extended: true })); //permite recibir datos de formularios estended false dado son datos sencillos
server.use(cors());
server.get("*", (req, res) => {
  return handler(req, res);
});
server.post('/datos', blockchainCtrl.postCertificates)
server.post('/user',  userCtrl.signUp)

module.exports = server






