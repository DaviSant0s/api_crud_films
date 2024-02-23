const users = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "John.doe@example.com",
        "password": "password123",
        "age": 21
    },

    {
        "id": 2,
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

    const user = users.find(u => u.id === Number(id));

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
    const { id, name, email, password, age } = req.body;

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

    const userIndex = users.findIndex(u => u.id === Number(id));

    if (userIndex < 0) {
        return res.json({
            error: '@users/update',
            message: `User not found ${id}`
        });
    }

    const userUpdated = {
        id: Number(id),
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

    const userIndex = users.findIndex(u => u.id === Number(id));

    if ( userIndex < 0){
        return res.status(400).json({
            error: '@users/update',
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