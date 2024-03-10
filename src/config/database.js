const mongoose = require("mongoose");

const { MONGO_DB_URI } = require('./env');

mongoose.connect(MONGO_DB_URI,
{
  // isso aqui é por causa do bendito email único, não de muita bola pra isso não
  autoIndex: true
}
);

mongoose.connection.on('connected' , () =>  console.log('Database connected succesfully'));
mongoose.connection.on('error' , () =>  console.log('Failed to connect database'));