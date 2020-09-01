'use strict'

const services = require('../services')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]
  console.log("token", token)
  services.decodeToken(token)
    .then(response => {
      console.log("response-token", response, token )
      req.user = response
      next()
    })
    .catch(response => {
      console.log("catch",response.status)
      res.status(response.status).send({message: "No es valido el token"})
    })
}

module.exports = isAuth
