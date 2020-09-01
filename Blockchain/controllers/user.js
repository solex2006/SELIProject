'use strict'

const User = require('../models/user')
const service = require('../services')
const axios = require('axios');
const config = require('../config')

var encryptor = require('simple-encryptor')(config.key);

function signUp(req, res) {
  //desencriptar datos de ususario\
  //console.log("Esto llega encriptado al servidor", req.body.data)
  var userData = encryptor.decrypt(req.body.data);
  console.log(req.body)
  console.log('obj decrypted:', userData);
  const user = new User({
    email: userData.email, //req.body.data.email
    displayName: userData.displayName,
    password: userData.password
  })

  //console.log("request para crear un usuario", req.body, user)
  user.save((err) => {//antes de eso se ejecuto un middleware
    //console.log("lo q va a guardar", user)
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    return res.status(201).send({ token: service.createToken(user), idStudent: userData.password })
  })
}


const signIn = (req, res) => {
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    if (!user) return res.status(404).send({ msg: `No existe el usuario: ${userData.email}` })

    return user.comparePassword(userData.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${userData.email}` })
      req.user = user
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
    }
    );

  }).select('_id email +password');
}

module.exports = {
  signUp,
  signIn
}
