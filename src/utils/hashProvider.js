const { compare, hash } = require('bcryptjs');

const generateHash = async (password) => {
  /**
   * O segundo parâmetro (salt) é a quantidade de vezes que ele vai entrar nesse looping de
   * encriptação, ou seja, ele vai encriptar 8 vezes a senha.
   */
  return hash(password, 8)
}

const compareHash = async (password, hashedPassword) => {
  /**
   * Ele vai comparar as duas strings
   * Vai hashear a string password e comparar com a string hashedPassword
   * compare vai retornar um booleano 
   */
  return compare(password, hashedPassword);
}

module.exports = {
  generateHash,
  compareHash
}