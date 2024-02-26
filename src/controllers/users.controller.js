const uuid = require('uuid');
const { generateHash } = require('../utils/hashProvider');

const users = [
    {
        "id": "d4e6852f-3f55-45ce-a794-79edde434b19",
        "name": "Davi Santos",
        "email": "davir17@gmail.com",
        "password": "$2a$08$BXp0eC5z/wMLLE0qJdh7oeg3Nrcx8OaAUC9qTK5ajvwsE2VOueKC6",
        "age": 24
    },
    {
        "id": "40edf2ad-7af2-400d-8d84-e4b7af0fa09a",
        "name": "John Doe",
        "email": "John.doe@example.com",
        "password": "$2a$08$QypmLoAmHB8CuPfqAKcwPeyNJGrZAbBvbYsXrWn3vHOBtGttOrtpm",
        "age": 21
    }
];

const list = (req, res) => {
    return res.json(users);
}

const getById = (req, res) => {
    const { id } = req.params;

    const user = users.find(u => u.id === id);

    if(!user){
        return res.status(400).json({
            // Isso é para o frontend saber onde deu o erro
            error: '@users/getById',
            // mensagem de erro
            message: `User not found ${id}`
        })
    }

    return res.json(user);
}

const create = async (req, res) => {
    const { name, email, password, age } = req.body;

    const id = uuid.v4();

    const hashedPassword = await generateHash(password);

    const user = {
        id,
        name,
        email,
        password: hashedPassword,
        age
    };

    users.push(user);
    
    return res.status(201).json(user);
}

const update = (req, res) => {
    const { id } = req.params;
    const { name, email, password, age } = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex < 0) {
        return res.json({
            error: '@users/update',
            message: `User not found ${id}`
        });
    }

    const userUpdated = {
        id,
        name,
        email,
        password,
        age,
    }

    users[userIndex] = userUpdated;

    return res.json(userUpdated);
}

const remove = (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(u => u.id === id);

    if ( userIndex < 0){
        return res.status(400).json({
            error: '@users/remove',
            message: `User not found ${id}`
        })
    }

    users.splice(userIndex, 1);

    // não vamos retonar nada, pois nao é necessário
    return res.send();
}

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
    userDatabase: users,
}