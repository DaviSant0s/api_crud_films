const MovieModel = require('../model/movie.model');

const create = async (req, res) => {
    const { title, description, year, genres, image, video }  = req.body;

    try {
        const movie = await MovieModel.create({
            title,
            description,
            year,
            genres,
            image, 
            video,
        });
        
        return res.status(201).json(movie);

    } catch (err) {
        return res.status(400).json({
            error: '@movies/create',
            message: err.message || 'Failed to create movies',
        })
    }

}

const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, year, genres, image, video } = req.body;

    try {
        const movieUpdated = await MovieModel.findByIdAndUpdate(id, {
            title,
            description,
            year,
            genres,
            image,
            video,
        }, {
            new: true,
        });
        
        return res.json(movieUpdated);
        
    } catch (err) {
        return res.status(400).json({
            error: '@novies/update',
            message: err.message || `Movie not found ${id}`
        });
    }
}

const list = async (req, res) => {

    try {
        const movies = await MovieModel.find();
        return res.json(movies);
        
    } catch (err) {
        return res.status(400).json({
            error: '@movies/list',
            message: err.message || 'Failed to list movies',
        })
    }

}

const getById = async (req, res) => {
    const { id } = req.params;

    
    try {
        const movie = await MovieModel.findById(id);

        if(!movie) {
            throw new Error();
        }    

        return res.json(movie);

    } catch (err) {
        return res.status(400).json({
            error: '@movies/getById',
            message: err.message || `Movie not found ${id}`,
        })
    }
}

const remove = async (req, res) => {
    const { id } = req.params;

    
    try {
        const movieRemoved = await MovieModel.findByIdAndDelete(id);

        if(!movieRemoved){
            throw new Error();
        }


        return res.status(204).send();
        
    } catch (err) {
        
        return res.status(400).json({
            error: '@movies/remove',
            message: err.message || `Movie not found ${id}`
        })
    }

}

module.exports = {
    list,
    getById,
    create,
    update,
    remove
}