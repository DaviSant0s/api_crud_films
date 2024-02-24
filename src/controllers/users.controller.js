const uuid = require('uuid');

const users = [
    {
        "id": "1f73e184-4447-4534-8a41-a80d35a787cb",
        "name": "John Doe",
        "email": "John.doe@example.com",
        "password": "password123",
        "age": 21
    },

    {
        "id": "a317e95e-6716-45cc-9a7c-e8cc042b6474",
        "name": "Davi santos",
        "email": "John.doe@example.com",
        "password": "password123",
        "age": 21
    },
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

const create = (req, res) => {
    const { name, email, password, age } = req.body;

    const id = uuid.v4();

    const user = {
        id,
        name,
        email,
        password,
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
    remove
}