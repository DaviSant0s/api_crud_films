const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://davisant_os:davi2427571@myprojects.cjeo6td.mongodb.net/telos?retryWrites=true&w=majority&appName=MyProjects',
{
  // isso aqui é por causa do bendito email único, não de muita bola pra isso não
  autoIndex: true
}
);

mongoose.connection.on('connected' , () =>  console.log('Database connected succesfully'));
mongoose.connection.on('error' , () =>  console.log('Failed to connect database'));