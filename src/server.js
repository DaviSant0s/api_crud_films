// express
const express = require('express');

// rotas
const userRoutes = require('./routes/users.routes');
const movieRoutes = require('./routes/movies.routes');
const authenticateRoutes = require('./routes/authenticate.routes');


const app = express();

const PORT = 3333;

// converte o buffer para json
app.use(express.json());

// que que ta depois do buffer
app.use(userRoutes);
app.use(movieRoutes);
app.use(authenticateRoutes);

app.listen(PORT, () => {
    console.log(`Api is running on port ${PORT}` );
});
