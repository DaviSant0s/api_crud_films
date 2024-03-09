const { generateHash } = require('../utils/hashProvider');

const UserModel = require('../model/user.model');


const users = [];

const list = async (req, res) => {
    try {
        // Retorna todos, mas sem a chave de password.
        const users = await UserModel.find({}, { password: 0});
        return res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: '@users/list',
            message: err.message || 'Failed to list users',
        });
    }

}

const getById = async (req, res) => {
    const { id } = req.params;

    try {
        // const user = await UserModel.find({ _id: id}, { password: 0});
        const user = await UserModel.findById(id, { password: 0});

        if(!user) {
            throw new Error();
        }

        return res.json(user);
        
    } catch (err) {
        return res.status(400).json({
            error: '@users/getById',
            message: err.message || `User not found ${id}`,
        });
    }
}

const create = async (req, res) => {
    const { name, email, password, age } = req.body;

    const hashedPassword = await generateHash(password);

    try {
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            age,
        });  
        
        return res.status(201).json(user);

    } catch (err) {
        return res.status(400).json({
            error: '@users/create',
            message: err.message || 'Failed to create',
        });
    }

}

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, age } = req.body;

    try {
        // primeiro eu passo o id e depois coloco na chave os campos que eu vou editar
        const userUpdated = await UserModel.findByIdAndUpdate(id, {
            name, 
            email, 
            password: await generateHash(password), 
            age
        }, 
        // pra ele retorna o atualizado, se não ele pega a versão anterior
        { new: true });

        if (!userUpdated){
            throw new Error();
        }
        
        return res.json(userUpdated);
        
    } catch (err) {
        return res.status(400).json({
            error: '@users/update',
            message: err.message || `User not found ${id}`,
        });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;

    try {

        const userDeleted = await UserModel.findByIdAndDelete(id);

        if(!userDeleted){
            throw new Error();
        }
        
        // não vamos retonar nada, pois nao é necessário
        return res.status(204).send();

    } catch (err) {
        return res.status(400).json({
            error: '@users/remove',
            message: err.message || `User not found ${id}`
        })
    } 
}

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
    userDatabase: users,
}