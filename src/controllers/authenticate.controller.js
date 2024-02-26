const jwt = require('jsonwebtoken');
const { userDatabase } = require('./users.controller');
const { compareHash } = require('../utils/hashProvider');
const jsonwebtoken = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = userDatabase.find(u => u.email === email);

  const loginErrorMessage = {
    error: "@authenticate/login",
    /**
     * vamos colocar 'or password', pois é um requisito de segurança. Ou seja, se uma
     * pessoa tentar acessar uma conta que não é dela, e ela começa a tentar vários
     * emais, e a gente fala que o email é inválido, a gente só tá abrindo mais uma
     * brecha. Pois, ela pode acertar o email e começar a testar diversas senhas, 
     * então a gente deixa isso como meio de segurança.
     */
    message: 'Invalid email or password',
  }

  if (!user) {
    return res.status(400).json(loginErrorMessage);
  }

  const isValidPassword = await compareHash(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json(loginErrorMessage);
  }

  // vamos passar os dados que vão conter nesse token, ou seja, o payload do usuário
  /**
   * no segundo parâmetro vamos passar um secret, ou seja, vamos criar um hash uma
   * informação que só a nossa aplicação vai saber, tanto criar esse hash como decifrar
   * esse hash posteriormente e obter as informações que estão dentro desse token.
   * 
   * Então precisamos ter esse secret para podermos decriptar nossa informação 
   * posteriormente
   * 
   * E no lugar de secret pode ser qualquer nome
   * 
   */
  const token = jwt.sign(user, 'secret', {
    expiresIn: "1h",
  });

  // estamos removendo a chave password de user
  delete user.password;

  return res.json({...user, token });
}

module.exports = {
  login,
};