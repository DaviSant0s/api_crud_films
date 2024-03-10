// Ele vai começar a executar e entender as variáveis ambiente, conseguir acessá-las a
// partir desse arquivo

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
}
