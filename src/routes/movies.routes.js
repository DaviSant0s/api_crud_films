const { Router } = require('express');

const moviesController = require('../controllers/movies.controller');

const routes = Router();

// listagem de filmes
routes.get('/movies', moviesController.list);

// buscar filme pelo id
routes.get('/movies/:id', moviesController.getById);

// criação de novos filmes
routes.post('/movies', moviesController.create);

// edição de filmes
routes.put('/movies/:id', moviesController.update);

// remoção dos filmes
routes.delete('/movies/:id', moviesController.remove);

module.exports = routes;