const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/env');

const verifyAuthentication = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization){
    return res.status(401).json({
      error: '@authenticate/missing-token',
      message: 'Token not send',
    })
  }

  // vamos validar tanto o prefixo quanto o token si
  // o split vai separar o token e o bearer e colocar em uma array
  // estamos desestruturand esse array, onde a primeira posição seria o prefixo e o
  // segundo vai ser o token

  const [ prefix, token ] = authorization.split(' ');

  const invalidTokenMessage = {
    error: '@authenticate/invalid-token',
    message: 'Token provided is invalid',
  }

  // verificar se o prefix é Bearer
  if(prefix !== 'Bearer') {
    return res.status(401).json(invalidTokenMessage)
  }
  
  // verificar se o token existe
  if(!token) {
    return res.status(401).json(invalidTokenMessage);
  }

  //verificar se o token é válido, ou seja, está assinado com o secret
  // E se ele está dentro do prazo de expiração
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err){
      console.log(err);
      return res.status(401).json(invalidTokenMessage);
    }

    console.log(decoded)
    req.user = decoded;

    return next();
  })
}

module.exports = {
  verifyAuthentication,
};