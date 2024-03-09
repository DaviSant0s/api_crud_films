const mongoose = require('mongoose');

// Vamos passar um objeto com meu schema contendo todos os meus usuários
// quando for requerido é true
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    // o campo de email vai ser único
    unique: true,
    // vai ser salvo com todas as letras minúsculas
    lowercase: true,
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
  }
}, {
  // O mongo já liga com o timestamps pra gente, não precisaos ficar configurando manualmente
  timestamps: true,
}

);

// com isso a gente vai poder imoportar esse model e utilizar ele no crud
// Vou passar o nome da minha collection e o Schema referente dessa collection (qual o tipo de documento que essa collection espera receber)

module.exports = mongoose.model('users', UserSchema);

