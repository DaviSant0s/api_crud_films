const { userDatabase } = require('./users.controller');
const { compareHash } = require('../utils/hashProvider');

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

  // estamos removendo a chave password de user
  delete user.password;

  return res.json(user);
}

module.exports = {
  login,
};