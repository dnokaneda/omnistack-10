const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

/****** DEV ******/
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs', DevController.delete);

/****** SEARCH ******/
routes.get('/search', SearchController.index);

module.exports = routes;