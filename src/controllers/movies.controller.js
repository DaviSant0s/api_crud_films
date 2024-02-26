const uuid = require('uuid');

const movies = [
    {
		"id": "f048ec60-ba05-4c6e-ad96-d33e5d464986",
		"title": "Inception",
		"description": "Dom Cobb (Leonardo DiCaprio) is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.",
		"year": 2010,
		"genres": [
			"Action",
			"Adventure",
			"Sci-Fi"
		],
		"image": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
		"video": "https://www.youtube.com/watch?v=YoHD9XEInc0"
	}
];

const create = (req, res) => {
    return res.json(req.user.id);

    const { title, description, year, genres, image, video }  = req.body;

    const id = uuid.v4();

    const movie = {
        id,
        title,
        description,
        year,
        genres,
        image, 
        video,
    }

    movies.push(movie);

    return res.status(201).json(movie);
}

const update = (req, res) => {
    const { id } = req.params;
    const { title, description, year, genres, image, video } = req.body;

    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex < 0) {
        return res.json({
            error: '@novies/update',
            message: `Movie not found ${id}`
        });
    }

    const movieUpdated = {
        id,
        title,
        description,
        year,
        genres,
        image,
        video
    }

    movies[movieIndex] = movieUpdated;

    return res.json(movieUpdated);
}

const list = (req, res) => {
    return res.json(movies);
}

const getById = (req, res) => {
    const { id } = req.params;

    const movie = movies.find(m => m.id === id);

    if(!movie){
        return res.status(400).json({
            error: '@movies/getById',
            message: `Movie not found ${id}`
        })
    }

    return res.json(movie);

}

const remove = (req, res) => {
    const { id } = req.params;

    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex < 0){
        return res.status(400).json({
            error: '@movies/remove',
            message: `Movie not found ${id}`
        })
    }

    movies.splice(movieIndex, 1);

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